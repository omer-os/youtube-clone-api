export const listChannelsDocs = {
  detail: {
    summary: "List channels",
    description: "Show all channels with pagination",
  },
};

export const showChannelDocs = {
  detail: {
    summary: "Show channel",
    description: "Show a single channel by ID",
  },
};

export const showChannelBySlugDocs = {
  detail: {
    summary: "Show channel by slug",
    description: "Show a single channel by its unique slug",
  },
};

export const showMyChannelDocs = {
  detail: {
    summary: "Show my channel",
    description: "Show the authenticated user's channel",
  },
};

export const addChannelDocs = {
  detail: {
    summary: "Add channel",
    description: "Create a new channel for the authenticated user. One channel per user.",
  },
};

export const updateChannelDocs = {
  detail: {
    summary: "Update channel",
    description: "Update an existing channel owned by the authenticated user",
  },
};

export const removeChannelDocs = {
  detail: {
    summary: "Remove channel",
    description: "Permanently remove a channel owned by the authenticated user",
  },
};
