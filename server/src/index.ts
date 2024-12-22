import express, { Express,Request,Response } from "express"
import dotenv from "dotenv"
import { PrismaClient,Workspace } from "@prisma/client"

const app : Express = express()
dotenv.config()
const PORT = process.env.PORT || 8080

const prisma = new PrismaClient()

app.use(express.json())

app.get('/',(req : Request, res : Response) => {
    res.json({
        thing : true
    })
})

// CREATE A WORKSPACE(params : name)
app.post('/workspaces/new',async (req,res) => {
    const { name } = req.body
    // invalid data
    if(!name) res.status(400)
    try {
        await prisma.workspace.create({
            data : {
                name,
            }
        })
        res.json({
            success : true
        })     
    } catch (error) {
        // console.log(error);
        res.status(400).json({
            success : false
        })        
    }
})

// GET ALL WORKSPACES
app.get('/workspaces/getall',async (req,res) => {
    const workspaces : Workspace[] = await prisma.workspace.findMany()
    res.json({
        workspaces
    })
})

// CREATE A TODO IN A WORKSPACE(params: wid + payload)
app.post('/todo/new',async (req,res) => {
    const { wid,name,startDate,endDate,status } = req.body
    try {
        await prisma.todo.create({
            data : {
                wid,
                name,
                startDate,
                endDate,
                status,
            }
        })
        res.json({
            success : true
        })    
    } catch (error) {
        res.status(400).json({
            success : false
        })        
    }
})

// GET ALL TODOS FOR A SPECIFIC WORKSPACE(headers : id)
app.get('/todos',async (req,res) => {
    const { id } = req.headers
    if(!id) {
        res.status(400).send('bad request')
    }
    try {
        const data = await prisma.workspace.findFirst({
            where : {
                id : Number(id)
            },
            select : {
                todos : true
            }
        })    
        res.json({
            todos : data?.todos
        })
    } catch (error) {
        res.status(400).json({
            success : false
        })
    }    
})

app.listen(PORT,() => {
    console.log(`listening at:\nhttp://localhost:${PORT}`)
})