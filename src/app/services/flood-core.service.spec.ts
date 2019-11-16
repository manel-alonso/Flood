import { TestBed } from '@angular/core/testing';

import { FloodCoreService } from './flood-core.service';

describe('FloodCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);
    expect(service).toBeTruthy();
  });

  it('should generate a playable area', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(10, 10);

    expect(service.floodOptions.active).toBeTruthy();
  });

  it('should generate a playable area with empty values', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(10, 10);

    expect(service.floodOptions.area[0][0]).toEqual(1);
  });

  it('should flood a column with water', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(1, 1);
    return service.startFlood().then(area => {
      expect(area[0][0]).toEqual(3);
    });
  });

  it('should flood a row with water', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(3, 3);
    service.floodOptions.speed = 10;

    return service.startFlood().then(area => {
      expect(area[0][0]).toEqual(3);
      expect(area[0][1]).toEqual(3);
    });
  });

  it('should not flood a row with water if there is a block', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(3, 3);
    service.floodOptions.area[0][1] = 2;
    service.floodOptions.speed = 10;

    return service.startFlood().then(area => {
      expect(area[0][0]).toEqual(3);
      expect(area[0][1]).toEqual(2);
    });
  });

  it('should not flood a column with water if there is a block on the row above blocking it', () => {
    const service: FloodCoreService = TestBed.get(FloodCoreService);

    service.generateArea(3, 3);
    service.floodOptions.area[1][0] = 2;
    service.floodOptions.speed = 10;

    return service.startFlood().then(area => {
      console.log("AREA", area);
      expect(area[2][0]).toEqual(1);
    });
  });

});
