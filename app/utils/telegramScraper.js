import * as cheerio from 'cheerio';

export async function scrapeChannel(channelName) {
  try {

    const response = await fetch(`https://t.me/s/${channelName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);


    const messages = $('.tgme_widget_message')
      .map((_, element) => {
        const post = $(element);
        const messageId = post.attr('data-post')?.split('/')[1];
        const text = post.find('.tgme_widget_message_text').text().trim();
        const date = post.find('.tgme_widget_message_date time').attr('datetime');

        const photos = post
          .find('.tgme_widget_message_photo_wrap')
          .map((_, photoElement) => {
            const style = $(photoElement).attr('style');
            const match = style ? style.match(/background-image:\s*url\(['"]?(.+?)['"]?\)/) : null;
            return match ? match[1] : null;
          })
          .get();

        return {
          id: messageId,
          text,
          date,
          photos,
        };
      })
      .get();

  
    const filteredMessages = messages.filter((message) => message.id !== '1');

    return filteredMessages;
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  }
}