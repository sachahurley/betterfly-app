# Figma MCP Setup Instructions

## ✅ Installation Complete!

The Figma MCP server has been installed and configured for your project.

## 🔑 Next Steps: Get Your Figma API Token

### Step 1: Get Your Figma API Token
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll down to "Personal Access Tokens" section
3. Click "Create new token"
4. Give it a name like "Betterfly App MCP"
5. Copy the generated token (keep it secure!)

### Step 2: Configure the API Key
1. Open the file `.cursor/mcp.json` in your project
2. Replace `YOUR_FIGMA_API_KEY_HERE` with your actual token
3. Save the file

### Step 3: Restart Cursor
1. Close and reopen Cursor to load the new MCP configuration
2. The Figma MCP tools should now be available in our chat!

## 🎨 What This Enables

Once configured, I'll be able to:
- ✅ Access your Figma files directly
- ✅ Generate code from Figma designs
- ✅ Extract design tokens and specifications
- ✅ Get component details and measurements
- ✅ Import designs as HTML/CSS

## 🔒 Security Note

Your Figma API token is like a password - keep it secure and never share it publicly. The token will only be used locally in your development environment.

## 📁 Files Created

- `.cursor/mcp.json` - MCP server configuration
- `FIGMA_MCP_SETUP.md` - This setup guide

## 🚀 Ready to Use!

Once you've added your API token and restarted Cursor, just share your Figma file URLs with me and I'll be able to work with your designs directly!
