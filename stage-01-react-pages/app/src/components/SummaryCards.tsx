// 1. 定义具体的 Props 类型契约
type SummaryCardsProps = {
  total: number;     // 总任务数
  completed: number; // 已完成数
  pending: number;   // 进行中（待办）数
};

// 2. 在组件签名处进行解构接收
export const SummaryCards = ({
  total,
  completed,
  pending,
}: SummaryCardsProps) => {
  const summaryItems = [
      {
        label: '总任务数',
        value: total,
        note: '当前列表中的全部任务。',
        modifier: '',
      },
      {
        label: '已完成',
        value: completed,
        note: '当前列表中的已完成的任务。',
        modifier: 'summary-value--success',
      },
      {
        label: '未完成',
        value: pending,
        note: '当前列表中未完成的任务',
        modifier: 'summary-value--warning',
      },
    ];

    return (
      <section className="summary-section" aria-label="任务摘要">
        {summaryItems.map((item) => (
          <article key={item.label} className="summary-card">
            <p className="summary-label">{item.label}</p>
            {/* 2. 动态组合基础类名与修饰符类名 */}
            <strong className={`summary-value ${item.modifier}`}>
              {item.value}
            </strong>
            <p className="summary-note">{item.note}</p>
          </article>
        ))}
      </section>
    );
};