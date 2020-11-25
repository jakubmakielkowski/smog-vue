<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from "chart.js";

const chartConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        lineTension: 0.33,
        fill: false,
        borderColor: ["#6c7493"],
        borderWidth: 5,
        pointRadius: 0
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "hsla(0, 0%, 0%, 0)",
            drawBorder: false,
            display: false
          },
          ticks: {
            suggestedMin: 0,
            fontFamily: "Poppins"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "hsla(0, 0%, 0%, 0)",
            drawBorder: false,
            display: false
          },
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            fontFamily: "Poppins",
            autoSkip: true,
            maxTicksLimit: 6
          }
        }
      ]
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
        right: 0,
        left: -2
      }
    },
    tooltips: {
      enabled: false
    },
    hover: {
      mode: null
    },
    animation: {
      duration: 300
    }
  }
};

export default {
  name: "Chart",
  props: {
    measurementData: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    measurementData() {
      this.updateChart(this.$props.measurementData);
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart, chartConfig);

    // if (this.$props.data.length) {
    //   this.updateChart(this.$props.data);
    // }
  },
  methods: {
    updateChart(measurements) {
      this.chart.data.labels = measurements.map(measurement => {
        const date = new Date(measurement.date);
        return `${String(date.getHours()).padStart(2, 0)}:00`;
      });
      this.chart.data.datasets[0].data = measurements.map(measurement => measurement.value);
      this.chart.update();
    }
  }
};
</script>

<style lang="scss">
.quality-index-indicator {
  border-radius: 100%;
  height: 20px;
  width: 20px;
}
</style>
