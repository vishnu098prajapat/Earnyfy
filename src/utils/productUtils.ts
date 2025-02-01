interface AffiliateProduct {
  title: string;
  image: string;
  price: number;
  affiliatePrice: number;
  affiliateLink: string;
}

export const extractAmazonProductId = (url: string): string | null => {
  // Match Amazon product ID patterns
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,     // matches /dp/PRODUCTID
    /\/gp\/product\/([A-Z0-9]{10})/, // matches /gp/product/PRODUCTID
    /\/([A-Z0-9]{10})(?:\/|\?|$)/ // matches /PRODUCTID/ or /PRODUCTID? or /PRODUCTID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const extractFlipkartProductId = (url: string): string | null => {
  // Match Flipkart product ID patterns
  const patterns = [
    /\/p\/([a-zA-Z0-9]{16})/, // matches /p/PRODUCTID
    /pid=([a-zA-Z0-9]{16})/, // matches pid=PRODUCTID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const getProductInfoFromUrl = async (url: string): Promise<AffiliateProduct | null> => {
  try {
    // This is where you would integrate with your backend API
    // For now, we'll return a placeholder response
    const response = await fetch('/api/product-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product info:', error);
    return null;
  }
};

export const validateAffiliateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const validDomains = [
      'amazon.in',
      'amazon.com',
      'flipkart.com',
      // Add more domains as needed
    ];
    
    return validDomains.some(domain => urlObj.hostname.endsWith(domain));
  } catch {
    return false;
  }
};
