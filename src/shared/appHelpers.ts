
export const formatDate = (date?: string): string => {
    if(date === null || date === undefined) return "";
    return new Date(date).toISOString().slice(0, 10).replace(/-/g, "/");
}

export const isValidMinutes = (value: string) => {
  if (!value) return false;
  if (!/^\d+$/.test(value)) return false;

  const minutes = Number(value);
  if (Number.isNaN(minutes)) return false;
  if (minutes <= 0) return false;

  return true;
};

export const isValidUrl = (value?: string) => {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const getMfaSecurityLevel = (minutes: number) => {
  if(minutes === 0 || minutes < 0 || minutes > 15) {
    return{
      label: "Impossible",
      color: "red",
    }
  }
  if (minutes <= 2) {
    return {
      label: "Très sécurisé",
      color: "green",
    };
  }

  if (minutes <= 5) {
    return {
      label: "Sécurité acceptable",
      color: "gold",
    };
  }

  if (minutes <= 10) {
    return {
      label: "Risque modéré",
      color: "orange",
    };
  }

  return {
    label: "Peu sécurisé",
    color: "red",
  };
};

export const getAuthTokenSecurityLevel = (minutes?: number) => {
  if (minutes === undefined || minutes === null) {return;}
  if (minutes <= 0) {
    return {
      label: "Invalide",
      color: "red",
    };
  }

  if (minutes <= 5) {
    return {
      label: "Très sécurisé",
      color: "green",
    };
  }

  if (minutes <= 15) {
    return {
      label: "Sécurisé",
      color: "limegreen",
    };
  }

  if (minutes <= 30) {
    return {
      label: "Équilibré",
      color: "gold",
    };
  }

  if (minutes <= 60) {
    return {
      label: "Risque acceptable",
      color: "orange",
    };
  }

  return {
    label: "Peu sécurisé",
    color: "red",
  };
};

