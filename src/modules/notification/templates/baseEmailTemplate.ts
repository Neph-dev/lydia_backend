export const baseEmailTemplate = (content: string, footer?: string): string => {
    const defaultFooter = `
    <div style="background-color: #eeeeee; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; color: #666;">
      <p>If you have any questions, please contact us at help@lydia.com</p>
      <p>&copy; ${new Date().getFullYear()} Lydia - Fighting Food Waste Together</p>
    </div>
  `;

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      ${content}
      ${footer || defaultFooter}
    </div>
  `;
};

export const emailHeader = (title: string): string => {
    return `
    <div style="background-color: #4a6f8a; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
      <h1 style="color: white; margin: 0;">${title}</h1>
    </div>
  `;
};