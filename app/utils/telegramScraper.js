
import puppeteer from 'puppeteer';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;


        if (totalHeight >= scrollHeight || document.querySelectorAll('.tgme_widget_message').length > 200) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export async function scrapeChannel(channelName) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(`https://t.me/s/${channelName}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await autoScroll(page);

    const messages = await page.evaluate(() => {
      const posts = document.querySelectorAll('.tgme_widget_message');
      
      return Array.from(posts).map(post => {
        const messageId = post.getAttribute('data-post')?.split('/')[1];
        const text = post.querySelector('.tgme_widget_message_text')?.innerText || '';
        const date = post.querySelector('.tgme_widget_message_date time')?.getAttribute('datetime');

        const photos = Array.from(post.querySelectorAll('.tgme_widget_message_photo_wrap'))
          .map(photo => {
            const style = photo.getAttribute('style');
            const match = style ? style.match(/background-image:\s*url\(['"]?(.+?)['"]?\)/) : null;
            return match ? match[1] : null;
          })
          .filter(Boolean);

        return {
          id: messageId,
          text,
          date,
          photos
        };
      });
    });

    const filteredMessages = messages.filter(message => message.id !== '1');

    await browser.close();
    return filteredMessages;

  } catch (error) {
    console.error('Error during scraping:', error);
    await browser.close();
    throw error;
  }
}

