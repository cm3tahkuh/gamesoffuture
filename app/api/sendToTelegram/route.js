import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { formData, players } = await req.json();

    // Проверка данных
    if (!formData || !formData.teamName || !formData.groupNumber || !formData.captainTelegram) {
      return NextResponse.json({ message: "Все поля формы должны быть заполнены." }, { status: 400 });
    }

    if (!players || players.length < 2) {
      return NextResponse.json({ message: "В команде должно быть минимум два игрока." }, { status: 400 });
    }


    const message = `
      📋 Новая заявка на турнир:
      🏆 Команда: ${formData.teamName}
      🔢 Номер группы: ${formData.groupNumber}
      👤 Капитан: ${formData.captainTelegram}
      🧑‍🤝‍🧑 Участники:
      ${players.map((p, i) => `${i + 1}. ${p.name} - ${p.role || "игрок"}`).join("\n")}
    `;


    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      return NextResponse.json({ message: "Сервер не настроен. Отсутствуют переменные окружения." }, { status: 500 });
    }


    const telegramResponse = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.json();
      return NextResponse.json({ message: "Ошибка отправки сообщения в Telegram.", error: telegramError }, { status: 500 });
    }

    return NextResponse.json({ message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ message: "Внутренняя ошибка сервера." }, { status: 500 });
  }
}
