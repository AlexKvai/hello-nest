import {Controller, Delete, Get, Post, Param, Patch, Body, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "Здесь будут возвращаться все фильмы";
    }

    @Get('search')
    search(@Query('year') searchingYear : string){
        return `Мы ищем фильм, выпущенный после ${searchingYear} года`;
    }

    @Get(':id')
    getOne(@Param('id') movieId : string){
        return `Здесь будет возвращаться один фильм с айдишником ${movieId}` ;
    }

    @Post()
    create(@Body() movieData) {
        return movieData;
    }

    @Delete(':id')
    remove(@Param('id') movieId : string) {
        return `Эта функция будет удалять фильм с айдишником ${movieId}`;
    }

    @Patch(':id')
    patch(@Param('id') movieId : string, @Body() updateData) {
        return {
            updatedMovie: movieId,
            ...updateData,
        };
    }


}