const stats = [
  { value: '500+', label: 'Happy Drivers' },
  { value: '13',   label: 'Cars Available' },
  { value: '$0',   label: 'Credit Check' },
  { value: '10+',  label: 'Yrs Experience' },
  { value: '$179', label: 'From Per Week' },
];

export function StatsBar() {
  return (
    <div className="bg-navy">
      <div className="container-custom py-5">
        <div className="flex flex-wrap items-center justify-around gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="text-center text-white">
                <div className="text-2xl font-extrabold md:text-3xl">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-white/50">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
