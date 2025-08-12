// Version Manager - Controls which version of each flow is active
// To switch versions, simply change the "active" value in versions.json

const VERSION_CONFIG_PATH = '/src/config/versions.json';

class VersionManager {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    async loadConfig() {
        try {
            const response = await fetch(VERSION_CONFIG_PATH);
            this.config = await response.json();
        } catch (error) {
            console.error('Failed to load version config:', error);
            // Fallback to v1 if config fails to load
            this.config = {
                onboarding: { active: 'v1' },
                dashboard: { active: 'v1' }
            };
        }
    }

    getActiveVersion(flow) {
        if (!this.config) {
            return 'v1'; // Default fallback
        }
        return this.config[flow]?.active || 'v1';
    }

    getVersionPath(flow, file) {
        const version = this.getActiveVersion(flow);
        return `/src/flows/${flow}/${version}/${file}`;
    }

    // Helper method to navigate to versioned pages
    navigateTo(flow, file) {
        const path = this.getVersionPath(flow, file);
        window.location.href = path;
    }

    // Get version info
    getVersionInfo(flow, version) {
        return this.config?.[flow]?.versions?.[version] || null;
    }

    // Check if a version exists
    versionExists(flow, version) {
        return this.config?.[flow]?.versions?.hasOwnProperty(version) || false;
    }
}

// Create global instance
window.versionManager = new VersionManager();