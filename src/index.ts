import * as ff from "@google-cloud/functions-framework";
import axios from "axios";
import cheerio from "cheerio";
import "dotenv/config";

const websiteUrl =
  "https://www.w-tokyodo.com/neostall/space/lunch/?lunch=%E6%85%B6%E6%87%89%E7%BE%A9%E5%A1%BE%E5%A4%A7%E5%AD%A6%E7%9F%A2%E4%B8%8A%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%91%E3%82%B9%E6%9D%91";

const slackEndPoint = process.env.SLACK_ENDPOINT;

type KitchenCar = {
  shopName: string;
  shopImg: string | undefined;
  menuImg: string | undefined;
  explanation: string;
};

ff.cloudEvent("helloPubSub", (cloudEvent) => {
  if (slackEndPoint === undefined) {
    throw new Error("SLACK_ENDPOINT is undefined");
  }
  getKitchenCars().then((kitchenCars) => {
    // if no kitchen car, do nothing
    if (kitchenCars.length === 0) {
      console.log("no kitchen car today");
      return;
    }
    // send to slack
    const todayStr = new Date().toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    axios.post(slackEndPoint, {
      text: `今日(${todayStr})のキッチンカー`,
    });

    for (const kitchenCar of kitchenCars) {
      axios.post(slackEndPoint, {
        text: kitchenCar.shopName,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*${kitchenCar.shopName}*`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: kitchenCar.explanation,
            },
            accessory: {
              type: "image",
              image_url: kitchenCar.menuImg,
              alt_text: "menu photo",
            },
          },
        ],
        attachments: [
          {
            text: "shop image",
            image_url: kitchenCar.shopImg,
            color: "#764FA5",
          },
        ],
      });
    }
  });
});

ff.http("helloHttp", (request, response) => {
  // response.send("Hello, World????");
  getKitchenCars().then((kitchenCars) => {
    response.send(kitchenCars);
  });
});

async function getKitchenCars(): Promise<KitchenCar[]> {
  const res = await axios.get(websiteUrl);
  const $ = cheerio.load(res.data);
  const shops = $(
    "#content .cnt_block .cnt_tabs .cnt_tabs_inner .active .cnt_block .cnt_archive_lists .cnt_archive_lists_col02"
  );
  const kitchenCars: KitchenCar[] = [];
  shops.children("li").each((i, e) => {
    let elem = cheerio.load(e);
    const shopName = elem("a h4 span").text();
    const shopImages = elem("a dl dt");
    const shopAppearanceImg = shopImages
      .children()
      .first()
      .find("img")
      .attr("src");
    const shopMenuImg = shopImages.children().last().find("img").attr("src");

    const shopExplanation = elem("a dl dd div p").text();

    kitchenCars.push({
      shopName,
      shopImg: shopAppearanceImg,
      menuImg: shopMenuImg,
      explanation: shopExplanation,
    });
  });

  return kitchenCars;
}
