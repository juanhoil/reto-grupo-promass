// src/models/Post.ts

import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    author!: string;

    @Column(DataType.DATE)
    publicationDate!: Date;

    @Column(DataType.TEXT)
    content!: string;
}
