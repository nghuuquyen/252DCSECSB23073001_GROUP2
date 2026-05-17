import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu đọc file ingredients.json...');
  const filePath = path.join(__dirname, '../lib/ingredients.json');
  
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const ingredients = JSON.parse(rawData);

  console.log(`📊 Quét thành công ${ingredients.length} món ăn!`);

  await prisma.ingredient.deleteMany();

  const dataToInsert = ingredients.map((item: any) => ({
    id: item.id ? String(item.id) : undefined, 
    name: String(item.name),
    calories: Math.round(Number(item.calories) || 0),
    protein: parseFloat(String(item.protein)) || 0,
    carbs: parseFloat(String(item.carbs)) || 0,
    fat: parseFloat(String(item.fat)) || 0,
  }));

  console.log('🚀 Bắt đầu đẩy lên Supabase...');
  await prisma.ingredient.createMany({
    data: dataToInsert,
  });

  console.log('✅ XONG! Dữ liệu đã lên Database an toàn!');
}

main()
  .catch((e) => {
    console.error('❌ Có lỗi xảy ra:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });