// app/api/telegram/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const TELEGRAM_BOT_TOKEN = '8128306533:AAEEsGMREiC6TmlV7MTtBUd_YEgIs_VZcDw';
  const CHANNEL_ID = '@gofnews';

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const messages = data.result.filter(update => 
      update.channel_post && 
      update.channel_post.chat.username === CHANNEL_ID.replace('@', '')
    );

    // Получаем пути к файлам для каждого сообщения с фото
    const messagesWithPhotoPaths = await Promise.all(
      messages.map(async (message) => {
        if (message.channel_post?.photo) {
          const photoId = message.channel_post.photo[2].file_id; // Берем самое большое изображение
          const fileResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${photoId}`
          );
          const fileData = await fileResponse.json();
          return {
            ...message,
            photo_path: fileData.result.file_path
          };
        }
        return message;
      })
    );

    return NextResponse.json({ messages: messagesWithPhotoPaths });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
