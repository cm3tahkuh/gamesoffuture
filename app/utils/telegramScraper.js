import * as cheerio from "cheerio";

export async function scrapeChannel(channelName) {
  try {
    const response = await fetch(`https://t.me/s/${channelName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch channel: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const messages = $(".tgme_widget_message")
      .map((_, element) => {
        const post = $(element);
        const messageId = post.attr("data-post")?.split("/")[1];

        // Extract raw text and clean it
        const rawText = post.find(".tgme_widget_message_text").html();
        let cleanedText = rawText
          ? rawText
              .replace(/<br\s*\/?>/g, "\n") // Replace <br> with new lines
              .replace(/<.*?>/g, "") // Remove any remaining HTML tags
              .trim()
          : "";

        // Extract title from the cleaned text
        const titleMatch = cleanedText.match(/^(.+?)(?:\n|$)/);
        const title = titleMatch ? titleMatch[1] : "Без заголовка";

        if (title) {
          const escapedTitle = title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
          cleanedText = cleanedText.replace(
            new RegExp(`^${escapedTitle}\\s*\n?`, "m"),
            ""
          ).trim();
        }
        // Extract date
        const date = post
          .find(".tgme_widget_message_date time")
          .attr("datetime");

        // Extract photos
        const photos = post
          .find(".tgme_widget_message_photo_wrap")
          .map((_, photoElement) => {
            const style = $(photoElement).attr("style");
            const match = style
              ? style.match(/background-image:\s*url\(['"]?(.+?)['"]?\)/)
              : null;
            return match ? match[1] : null;
          })
          .get();

        return {
          id: messageId,
          title, // Extracted title
          text: cleanedText, // Cleaned text with line breaks
          date,
          photos,
        };
      })
      .get();

    const filteredMessages = messages.filter((message) => message.id !== "1");

    return filteredMessages;
  } catch (error) {
    console.error("Error during scraping:", error);
    throw error;
  }
}
