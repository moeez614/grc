
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  // stages: [
  //   { duration: "30s", target: 50 },
  //   { duration: "1m", target: 100 },
  //   { duration: "2m", target: 500 },
  //   { duration: "30s", target: 0 },
  // ],
   vus: 50,
  duration: "30s",
};

export default function () {
  http.get("http://localhost:5000/");
  sleep(1);
}