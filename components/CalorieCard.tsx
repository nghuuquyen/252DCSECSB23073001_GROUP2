interface CalorieCardProps {
  remaining: number;
  consumed: number;
  target: number;
}

export default function CalorieCard({
  remaining,
  consumed,
  target,
}: CalorieCardProps) {
  const percentage = (consumed / target) * 100;

  return (
    <div className="rounded-3xl bg-white shadow-lg p-5 sm:p-6 lg:p-7 mb-5 sm:mb-6">
      <div className="text-center mb-5 sm:mb-6">
        <h2 className="text-sm text-gray-600 font-medium mb-2">Hôm nay</h2>

        <div className="flex justify-center items-end gap-2 lg:gap-3 mb-3 lg:mb-4">
          <div>
            <p className="text-4xl lg:text-5xl font-bold text-emerald-600">{remaining}</p>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">Calo còn lại</p>
          </div>
          <div className="text-right">
            <p className="text-lg lg:text-xl text-gray-700">{consumed}</p>
            <p className="text-xs lg:text-sm text-gray-500">Đã ăn</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 lg:h-2.5">
          <div
            className="bg-emerald-500 h-2 lg:h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>

        <p className="text-xs lg:text-sm text-gray-500 mt-2">{consumed} / {target} kcal</p>
      </div>
    </div>
  );
}