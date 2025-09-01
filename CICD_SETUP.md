# CI/CD Setup Guide for Atlas Project

This guide will help you set up automated deployment to your DigitalOcean droplet using GitHub Actions.

## Overview

The CI/CD pipeline will:

- Trigger on every push to the `master` branch
- SSH into your DigitalOcean droplet
- Pull the latest code changes
- Rebuild and restart your Docker containers
- Clean up unused Docker images

## Setup Steps

### Step 1: Generate SSH Key Pair for GitHub Actions

On your **local machine**, run these commands:

```bash
# Generate a new SSH key pair specifically for GitHub Actions
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_key -N ""

# This creates two files:
# ~/.ssh/github_actions_key (private key) - for GitHub Secrets
# ~/.ssh/github_actions_key.pub (public key) - for your droplet
```

### Step 2: Add Public Key to Your DigitalOcean Droplet

Copy the public key to your droplet:

```bash
# Copy the public key content
cat ~/.ssh/github_actions_key.pub

# SSH into your droplet
ssh root@YOUR_DROPLET_IP

# On the droplet, add the public key to authorized_keys
echo "PASTE_PUBLIC_KEY_CONTENT_HERE" >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Step 3: Set Up GitHub Repository Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these secrets:

| Secret Name       | Value                                  | Description                                       |
| ----------------- | -------------------------------------- | ------------------------------------------------- |
| `SSH_PRIVATE_KEY` | Content of `~/.ssh/github_actions_key` | Private key for SSH access                        |
| `HOST`            | Your droplet's IP address              | DigitalOcean droplet IP                           |
| `USERNAME`        | `root`                                 | SSH username (you mentioned you have root access) |

To get the private key content:

```bash
cat ~/.ssh/github_actions_key
```

Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) and paste it as the `SSH_PRIVATE_KEY` secret.

### Step 4: Prepare Your Droplet

SSH into your droplet and ensure your project is set up correctly:

```bash
ssh root@YOUR_DROPLET_IP

# Navigate to your project directory
cd /app/test_atlas

# Ensure it's a git repository and connected to your remote
git remote -v

# If not already set up, initialize git:
# git init
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
# git pull origin master

# Test that docker-compose works
docker-compose ps
```

### Step 5: Test the Setup

1. **Commit and push the workflow file**:

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add CI/CD workflow"
   git push origin master
   ```

2. **Monitor the deployment**:

   - Go to your GitHub repository
   - Click on the **Actions** tab
   - You should see the workflow running
   - Click on the workflow run to see detailed logs

3. **Verify on your droplet**:
   ```bash
   ssh root@YOUR_DROPLET_IP
   cd /app/test_atlas
   docker-compose ps
   ```

## Workflow Features

- **Automatic deployment** on push to master branch
- **Manual deployment** option (workflow_dispatch trigger)
- **Container rebuild** to ensure latest changes are applied
- **Docker cleanup** to prevent disk space issues
- **Deployment verification** to confirm services are running
- **Detailed logging** for troubleshooting

## Troubleshooting

### Common Issues:

1. **SSH Connection Failed**:

   - Verify the SSH key is correctly added to GitHub secrets
   - Ensure the public key is in `~/.ssh/authorized_keys` on your droplet
   - Check that your droplet IP is correct

2. **Git Pull Failed**:

   - Ensure your droplet has git configured
   - Check that the repository remote is set up correctly
   - Verify the droplet has internet access

3. **Docker Compose Failed**:

   - Check that Docker and Docker Compose are installed on your droplet
   - Verify your `docker-compose.yml` file is valid
   - Check container logs: `docker-compose logs`

4. **Permission Issues**:
   - Ensure you're using the correct username (root)
   - Verify SSH key permissions are correct (600 for private key)

### Viewing Logs:

- **GitHub Actions logs**: Go to Actions tab in your repository
- **Application logs on droplet**:
  ```bash
  docker-compose logs -f
  ```

## Security Notes

- The SSH key generated is specifically for CI/CD and should not be used for manual access
- Keep your GitHub secrets secure and never share them
- Consider using a dedicated deployment user instead of root for enhanced security
- Regularly rotate your SSH keys

## Next Steps

Once this is working, you can enhance the pipeline by adding:

- Running tests before deployment
- Database migrations
- Slack/email notifications
- Blue-green deployments
- Health checks after deployment
