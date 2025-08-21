interface DisqusPage {
  identifier: string;
  url: string;
  title: string;
}

interface DisqusResetConfig {
  reload: boolean;
  config: () => void;
}

export interface DisqusInstance {
  reset: (config: DisqusResetConfig) => void;
}

export interface DisqusConfig {
  page: DisqusPage;
  callbacks: DisqusPage;
}
