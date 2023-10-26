interface ICrudQuery {
  where?: any;
  limit?: number;
  page?: number;
  skip?: number;
  sort?: string | any;
  populate?: string | any;
  select?: string | any;
}
interface IModal {
  open: boolean;
  onClose: () => void;
}

interface ICreated {
  by: string;
  userAdmin: string;
}
