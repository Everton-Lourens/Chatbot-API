export function numberEmoji(number: number) {
   const blueEmojis = [
      "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"
   ];
   if (number < 0 || number > 9)
      return number;
   return blueEmojis[number];
}