type FinalGameStatusProps = {
  readonly endedInPeriod: number;
};

const FinalOvertime = ({ otPeriods }: { otPeriods: number }) => {
  if (otPeriods === 1) {
    return (
      <>
        <span className="mx-auto block">Final/OT</span>
        <span className="mx-auto block pt-6"></span>
      </>
    );
  }

  return (
    <>
      <span className="mx-auto block">Final/{otPeriods}OT</span>
      <span className="mx-auto block pt-6"></span>
    </>
  );
};

export const FinalGameStatus = ({ endedInPeriod }: FinalGameStatusProps) => {
  const endedInOvertime = endedInPeriod > 3;

  if (endedInOvertime) {
    const otPeriods = endedInPeriod - 3;
    return <FinalOvertime otPeriods={otPeriods} />;
  }

  return (
    <>
      <span className="mx-auto block">Final</span>
      <span className="mx-auto block pt-6"></span>
    </>
  );
};
