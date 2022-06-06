import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import  Author  from "../model/Author";

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const {name} = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    })

    return author.save().then(
        (author) => res.status(201).json({author}),
    ).catch(err => res.status(500).json({error: err}))
}
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
    .then(author => author ? res.status(200).json({author: author}): res.status(404).json({message: 'Author not found'}))
    .catch(err => res.status(500).json({error: err}))
}
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
    .then(author => {
        if(author){
            author.set(req.body)

            return author.save()
            .then((author) => res.status(200).json({author}))
            .catch(err => res.status(500).json({error: err}))
        }else{
            return res.status(404).json({message: 'Author not found'})
        }
    })
    .catch(err => res.status(500).json({error: err}))
}
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
    .then(author =>  res.status(200).json({author: author}))
    .catch(err => res.status(500).json({error: err}))
}
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
    .then(author => author ? res.status(200).json({message: 'Delete'}): res.status(404).json({message: 'Author not found'}))
    .catch(err => res.status(500).json({error: err}))
}

export default { createAuthor, readAuthor, updateAuthor, readAllAuthor, deleteAuthor }