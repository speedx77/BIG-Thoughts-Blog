import express from "express";
import bodyParser from "body-parser";
import submissionsJSON from "storedSubmissions";

var data = [];
var createdSlug = "";
var userTitle = "";
var userTag = "";
var userSubmission = "";
var userFirstSentence = "";

var userData = [];

function loadSubmissions( req, res, next) {

    for (var i = 0; i < submissionsJSON.submission.length; i++){

        data[i] = ( {
            storedTitle: submissionsJSON.submission[i].storedTitle,
            storedTag: submissionsJSON.submission[i].storedTag,
            storedSubmission: submissionsJSON.submission[i].storedSubmission,
            storedFirstSentence: submissionsJSON.submission[i].storedFirstSentence
        })
    }
    next();
}



const app = express();
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(loadSubmissions)
//app.use(createUserSlug)

app.get("/", (req, res) => {
    res.render("index.ejs", {title: userTitle, firstSentence: userFirstSentence});
    //console.log(submissionsJSON.Sacrifice2)
    //console.log(data[0])
});

app.get("/new-post", (req, res) => {
    res.render("new-post.ejs");
})

app.get("/view-post", (req, res) => {
    res.render("view-post.ejs", {title : userTitle, flexRadioDefault: userTag, submission : userSubmission, data});
    //storedTitle: submissionsJSON.Sacrifice.storedTitle, storedFlexRadioDefault: submissionsJSON.Sacrifice.storedTag, storedSubmission: submissionsJSON.Sacrifice.storedSubmission
})

app.get("/view-post/:submissionSlug",  (req, res) => {

    //console.log(createdSlug)

    if (req.params.submissionSlug == "sacrifice") {
        res.render("view-post.ejs", { data: data[0] });
    }
    else if (req.params.submissionSlug == "you-are-not-free") {
        res.render("view-post.ejs", { data: data[1] });
    }
    else if (req.params.submissionSlug == "r-depression") {
        res.render("view-post.ejs", { data: data[2] });
    }
    else if (req.params.submissionSlug == "mr-igl") {
        res.render("view-post.ejs", { data: data[3] });
    }

    for(var i = 0; i < userData.length; i++) {
        if (req.params.submissionSlug == userData[i].slug){
            res.render("view-post.ejs", {userData: userData[i], data})
        }
    }
    
})

/*

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

*/

app.get("/all-posts", (req, res) => {
    res.render("all-posts.ejs", {title: userTitle, firstSentence: userFirstSentence, slug: createdSlug, data, userData});

    for(var i = 0; i < userData.length; i++){
        console.log(userData.findIndex(element => element.slug === userData[i].slug))
    }
    // storedTitle: submissionsJSON.Sacrifice.storedTitle, storedFirstSentence: submissionsJSON.Sacrifice.storedFirstSentence
}) 
app.post("/create-post" , (req, res) => {
    //console.log(req.body)
    /*
    userTitle = req.body.title;
    userTag = req.body.flexRadioDefault;
    userSubmission = req.body.submission;

    userFirstSentence = userSubmission.split(' ').slice(0,15).join(' ');
    //console.log(req.body);
    //req.params.slug = createdSlug
    createdSlug = userTitle.trim().replace(/\s+/g, " ").toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

    console.log(createdSlug)
    */

    userData.push({
        title : req.body.title,
        flexRadioDefault : req.body.flexRadioDefault,
        submission : req.body.submission,
        firstSentence : req.body.submission.split(' ').slice(0,15).join(' '),
        slug : req.body.title.trim().replace(/\s+/g, " ").toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    });


    res.render("view-new-post.ejs", {userData : userData[userData.length - 1], data});
    //res.render("all-posts.ejs", {title: userTitle, firstSentence: userFirstSentence});
    //{title : userTitle, flexRadioDefault: userTag, submission : userSubmission, data}
    
})

app.get("/personal", (req, res) => {

    res.render("personal.ejs", {title: userTitle, firstSentence: userFirstSentence, slug: createdSlug, data, userData});

    for(var i = 0; i < userData.length; i++){
        console.log(userData.findIndex(element => element.slug === userData[i].slug))
    }
})

app.get("/poetry", (req, res) => {

    res.render("poetry.ejs", {title: userTitle, firstSentence: userFirstSentence, slug: createdSlug, data, userData});

    for(var i = 0; i < userData.length; i++){
        console.log(userData.findIndex(element => element.slug === userData[i].slug))
    }
})

app.get("/political", (req, res) => {

    res.render("political.ejs", {title: userTitle, firstSentence: userFirstSentence, slug: createdSlug, data, userData});

    for(var i = 0; i < userData.length; i++){
        console.log(userData.findIndex(element => element.slug === userData[i].slug))
    }
})




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

