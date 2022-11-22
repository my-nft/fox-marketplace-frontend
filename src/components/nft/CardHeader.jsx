const CardHeader = () => {
  return (
    <div class="card-header">
      <p class="text-center pb-3">
        Sale ends November 30, 2022 at 23:59pm GMT+1
      </p>
      <div class="countdown">
        <div class="countdown__days">
          <div class="number"></div>
          <span class>Days</span>
        </div>

        <div class="countdown__hours">
          <div class="number"></div>
          <span class>Hours</span>
        </div>

        <div class="countdown__minutes">
          <div class="number"></div>
          <span class>Minutes</span>
        </div>

        <div class="countdown__seconds">
          <div class="number"></div>
          <span class>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
