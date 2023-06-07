# Slackにキッチンカーの情報を流すやつ

矢上のキッチンカー情報をSlackに流します

# 使い方

1. パッケージインストール: `npm install`
2. `.env`ファイルを用意

中身にSlackのWebhook URLを入れる(Webhookの作り方は https://api.slack.com/messaging/webhooks)

```
SLACK_ENDPOINT=https://hooks.slack.com/services/********
```

3. `npm run deploy`でデプロイ

# 仕組み

```
Cloud Schedulerで定期実行
↓
Cloud Pub/Subでキューイング
↓
Cloud Functionsで関数実行
↓
HTTP GETでキッチンカーのサイトを取得
↓
Slack Webhookにデータを送信
```

# 参考

- https://dev.classmethod.jp/articles/try-cloud-functions-scheduler-pubsub/
- https://www.softbank.jp/biz/blog/cloud-technology/articles/202301/deploy-a-slack-using-cf/
