import InfoBoxWrapper from "./infoBoxWrapper";
import { ReactComponent as ContentIcon } from "./../../assets/icons/content.svg";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

const PriceHistory = ({
  priceHistory = [
    {
      date: new Date("2021-08-01T00:00:00.000Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: 0.1,
    },
    {
      date: new Date("2021-08-02T00:00:00.000Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: 0.3,
    },
    {
      date: new Date("2021-08-04T00:00:00.000Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: 2,
    },
    {
      date: new Date("2021-08-05T00:00:00.000Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: 1,
    },
    {
      date: new Date("2021-08-12T00:00:00.000Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      price: 3,
    },
  ],
}) => {
  const chartData = {
    labels: priceHistory.map((item) => item.date),
    datasets: [
      {
        id: 1,
        label: "Price History",
        data: priceHistory.map((item) => item.price),
      },
    ],
  };

  const options = {
    title: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 16,
        right: 48,
        top: 48,
        bottom: 48,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        display: true,
        xPadding: 8,
        yPadding: 8,
        backgroundColor: "#f58103",
      },
    },
    scales: {
      y: {
        ticks: {
          padding: 20,
        },
        grid: {
          color: "rgba(247,247,247,.03)",
          lineWidth: 2,
          borderDash: [],
          drawOnChartArea: true,
          drawTicks: false,
        },
      },
      x: {
        ticks: {
          padding: 20,
        },
        stacked: true,
      },
    },
    elements: {
      point: {
        radius: 4,
        pointStyle: "circle",
        borderColor: "#f58103",
        borderWidth: 2,
        backgroundColor: "#fff",
      },
      line: {
        borderColor: "#f58103",
        tension: 0.2,
      },
    },
  };

  return (
    <InfoBoxWrapper title="Price History">
      <div className="priceHistory">
        {priceHistory.length && <Line data={chartData} options={options} />}
        {priceHistory.length === 0 && (
          <div className="noContent">
            <ContentIcon />
            <p>No Price History</p>
          </div>
        )}
      </div>
    </InfoBoxWrapper>
  );
};

export default PriceHistory;
