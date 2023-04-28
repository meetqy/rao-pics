import { getPredictions } from "../lib/core";

getPredictions("/Users/qymeet/Pictures/test.library/images/LGG68OZ7MYX46.info/0.4.4-0411-94.jpg", "model", {
  size: 299,
}).then((res) => console.log(res));
