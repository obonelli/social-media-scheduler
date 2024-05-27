import axios from 'axios';
import { NotificationService } from '../interfaces/NotificationService';

export class LinkedInService implements NotificationService {
  private clientId = process.env.LINKEDIN_CLIENT_ID!;
  private clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
  private redirectUri = process.env.LINKEDIN_REDIRECT_URI!;
  private personUrn = process.env.LINKEDIN_PERSON_URN!;
  private accessToken: string | null = null;

  async authenticate(): Promise<void> {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    console.log(`Please go to ${authUrl} to authenticate`);
  }

  async handleCallback(code: string): Promise<void> {
    const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';

    try {
      const response = await axios.post(tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.redirectUri,
          client_id: this.clientId,
          client_secret: this.clientSecret
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('Error obteniendo el token de acceso:', error);
      throw error;
    }
  }

  async schedulePost(postContent: string, scheduleDate: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No access token available. Please authenticate first.');
    }

    const postUrl = 'https://api.linkedin.com/v2/ugcPosts';
    const body = {
      author: `urn:li:person:${this.personUrn}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: postContent,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
      scheduledAt: scheduleDate
    };

    try {
      await axios.post(postUrl, body, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
      });
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  }
}
