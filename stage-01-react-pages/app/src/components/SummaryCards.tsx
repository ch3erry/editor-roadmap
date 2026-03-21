export const SummaryCards = () => {
const summaryItems = [
    {
      label: '总任务数',
      value: '4',
      note: '当前列表中的全部任务。',
      modifier: '',
    },
    {
      label: '已完成',
      value: '2',
      note: '后续可由 props 或简单计算得出。',
      modifier: 'summary-value--success',
    },
    {
      label: '未完成',
      value: '2',
      note: '为 REQ-02 与 REQ-03 预留状态流转。',
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