import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import {NotFoundException} from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('Должна возвращаться 4-ка', () => {
  //   expect(2+2).toEqual(4);
  // })
  describe('Тестирование функции getAll', () => {
    it('Должен возвращаться массив', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('Тестирование функции getOne', () => {
    it('Должен возвращаться фильм', () => {
      service.create({
        title: "Тестовый фильм",
        genres: ["Тестовый жанр"],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.getOne(1234);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Фильм с id: 1234 не найден`);
      }
    })
  })

  describe('Тестирование функции remove', () => {
    it('Фильм удаляется', () => {
      service.create({
        title: "Тестовый фильм",
        genres: ["Тестовый жанр"],
        year: 2000,
      });
      const allMovies = service.getAll();
      service.remove(1);
      const afterRemove = service.getAll();
      expect(afterRemove.length).toEqual(allMovies.length - 1);
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.remove(1234);
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })

  describe('Тестирование функции create', () => {
    it('Фильм создаётся', () => {

      const beforeCreate = service.getAll().length;
      service.create({
        title: "Тестовый фильм",
        genres: ["Тестовый жанр"],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  })

  describe('Тестирование функции patch', () => {
    it('Фильм изменён', () => {
      service.create({
        title: "Тестовый фильм",
        genres: ["Тестовый жанр"],
        year: 2000,
      });
      service.patch(1, {title: 'Обновлённый тест'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Обновлённый тест');
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.patch(1234, {title: ''});
      }
      catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  })

});
