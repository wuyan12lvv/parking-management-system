<template>
  <div style="padding: 30px;font-size: 35px;">
    <span className="time" id="time">
        <span className="date">{{ nowTime }}</span>
          <span className="hour">{{ time.hour }}</span>
        <a className="split">:</a>
        <span className="minitus">{{ time.minitus }}</span>
        <a className="split">:</a>
        <span className="seconds">{{ time.seconds }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "DateUtils",
  data() {
    return {
      time: {
        hour: "00",
        minitus: "00",
        seconds: "00"
      },
      nowTime: "",
      week: [
        "星期天",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ]
    };
  },
  computed: {
    formattedTime() {
      return {
        hour: this.format(this.time.hour),
        minitus: this.format(this.time.minitus),
        seconds: this.format(this.time.seconds)
      };
    }
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      const now = new Date();
      let hours = now.getHours();
      // 如果小时数小于10，格式化为两位数，例如"01"
      hours = hours.toString().padStart(2, '0');
      this.time.hour = hours;
      this.time.minitus = now.getMinutes().toString().padStart(2, '0');
      this.time.seconds = now.getSeconds().toString().padStart(2, '0');
      this.nowTime = this.formatDate(now);
    },
    format(number) {
      return number.toString().padStart(2, '0');
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayOfWeek = this.week[date.getDay()];
      return `${year}年${this.format(month)}月${this.format(day)}日 ${dayOfWeek}`;
    }
  }
}
</script>

<style scoped>
.split {
  animation: shark 1s ease-in-out infinite;
  vertical-align: middle;
  margin: 0 2px;
  display: inline-block;
}
@keyframes shark {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
