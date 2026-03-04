export const KpiCard = ({ title, value, percentage, Icon, iconColor }) => {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-[#1E1E2E] dark:bg-[#12122A]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 transition-colors duration-300 dark:text-[#94A3B8]">
          {title}
        </span>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-bold text-slate-800 transition-colors duration-300 dark:text-[#F1F5F9]">
          {value}
        </h4>
        {percentage && (
          <span className="text-xs font-bold text-slate-400 transition-colors duration-300 dark:text-[#64748B]">
            ({percentage})
          </span>
        )}
      </div>
    </div>
  );
};