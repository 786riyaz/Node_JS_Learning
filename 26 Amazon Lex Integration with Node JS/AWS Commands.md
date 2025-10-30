Absolutely 🔥 — here’s a **complete, ready-to-use AWS Command-Line (CLI) Cheat Sheet** for everything we’ve used and discussed so far for your **Amazon Lex + Node.js chatbot integration**.

I’ll organize them by purpose so you can keep this as your **reference file**.

---

# 🧭 **AWS CLI Command Cheat Sheet for Lex + Node.js**

---

## 🧩 **1️⃣ Setup and Configuration**

### Install AWS CLI (Windows)

(Only once)

```
https://aws.amazon.com/cli/
```

### Verify installation

```bash
aws --version
```

### Configure your credentials (Access Key, Secret Key, Region)

```bash
aws configure
```

### Verify identity (to confirm you’re logged in correctly)

```bash
aws sts get-caller-identity
```

---

## 🧾 **2️⃣ Lex Bot Management Commands**

### List all bots in your region

```bash
aws lexv2-models list-bots --region ap-southeast-2
```

### List aliases for a specific bot

```bash
aws lexv2-models list-bot-aliases --bot-id <BOT_ID> --region ap-southeast-2
```

Example:

```bash
aws lexv2-models list-bot-aliases --bot-id PKHTFQHUDD --region ap-southeast-2
```

### Get full bot details

```bash
aws lexv2-models describe-bot --bot-id <BOT_ID> --region ap-southeast-2
```

### Get alias details (optional)

```bash
aws lexv2-models describe-bot-alias --bot-id <BOT_ID> --bot-alias-id <ALIAS_ID> --region ap-southeast-2
```

---

## 💬 **3️⃣ Lex Runtime (Testing Your Bot via CLI)**

Send a test message to your Lex bot:

```bash
aws lexv2-runtime recognize-text \
  --bot-id <BOT_ID> \
  --bot-alias-id <BOT_ALIAS_ID> \
  --locale-id en_US \
  --session-id testuser \
  --text "Hello" \
  --region ap-southeast-2
```

Example:

```bash
aws lexv2-runtime recognize-text \
  --bot-id PKHTFQHUDD \
  --bot-alias-id MM7CUD6BTC \
  --locale-id en_US \
  --session-id user1 \
  --text "Hi there" \
  --region ap-southeast-2
```

---

## 🔒 **4️⃣ IAM (Permissions and Security)**

### List IAM users

```bash
aws iam list-users
```

### Get user details

```bash
aws iam get-user --user-name NodeJS
```

### List attached policies for a user

```bash
aws iam list-attached-user-policies --user-name NodeJS
```

### Attach a policy to your IAM user

```bash
aws iam attach-user-policy --user-name NodeJS --policy-arn arn:aws:iam::309594616250:policy/LexRecognizeTextAccess
```

### Detach a policy (if needed)

```bash
aws iam detach-user-policy --user-name NodeJS --policy-arn arn:aws:iam::309594616250:policy/LexRecognizeTextAccess
```

### List all custom IAM policies

```bash
aws iam list-policies --scope Local
```

### Get policy details

```bash
aws iam get-policy --policy-arn arn:aws:iam::309594616250:policy/LexRecognizeTextAccess
```

---

## 🧰 **5️⃣ Useful IAM + Lex Policy Template**

Here’s the JSON we used to grant minimal permissions for your Node.js bot:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lex:RecognizeText",
        "lex:RecognizeUtterance"
      ],
      "Resource": "arn:aws:lex:ap-southeast-2:309594616250:bot-alias/PKHTFQHUDD/MM7CUD6BTC"
    },
    {
      "Effect": "Allow",
      "Action": [
        "lex:ListBots",
        "lex:ListBotAliases"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 🚀 **6️⃣ (Optional) AWS Deployment Commands**

If you later deploy to **Elastic Beanstalk**:

### Install Elastic Beanstalk CLI

```bash
pip install awsebcli
```

### Initialize your project

```bash
eb init
```

### Create and deploy environment

```bash
eb create my-lex-app
```

### Open deployed app

```bash
eb open
```

---

## 🧹 **7️⃣ Troubleshooting / Utility**

### Check AWS CLI configuration file location

```bash
cat ~/.aws/credentials
```

(On Windows)

```bash
type C:\Users\<YourUser>\.aws\credentials
```

### Clear cached credentials (if switching users)

```bash
aws configure --profile newuser
```

### Validate IAM user permissions

```bash
aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::309594616250:user/NodeJS --action-names lex:RecognizeText
```

---

## ✅ **8️⃣ Quick Testing Recap**

| Task                 | Command                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verify AWS CLI login | `aws sts get-caller-identity`                                                                                                                                 |
| List your Lex bots   | `aws lexv2-models list-bots --region ap-southeast-2`                                                                                                          |
| List aliases         | `aws lexv2-models list-bot-aliases --bot-id <BOT_ID> --region ap-southeast-2`                                                                                 |
| Test bot chat        | `aws lexv2-runtime recognize-text --bot-id <BOT_ID> --bot-alias-id <ALIAS_ID> --locale-id en_US --session-id testuser --text "Hello" --region ap-southeast-2` |

---

Would you like me to export this cheat sheet as a **text file (AWS_Lex_NodeJS_Commands.txt)** so you can download and keep it locally?
