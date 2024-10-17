import Resource from '../../../api/resource';

export class RoadService extends Resource {
    constructor() {
      super('geocoding',"api-backend","base");
    }

    get_road(token) {
      this.setAdditionUri(`/road/${token}`);
      return this.get();
    }
  }