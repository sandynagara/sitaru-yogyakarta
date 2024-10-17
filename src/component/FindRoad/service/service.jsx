import Resource from '../../../api/resource';

export class RoadService extends Resource {
    constructor() {
      super('geocoding',"api","api-backend");
    }

    get_road(token) {
      this.setAdditionUri(`/road/${token}`);
      return this.get();
    }
  }