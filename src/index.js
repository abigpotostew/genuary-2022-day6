import p5 from 'p5';
import {PRNGRand} from "./random";
import {ColorScheme} from "./color";
import {sol852} from "./sol-lewitt";


let chunks = []
var recorder;
const pixelDens = 1;
const sketch = p5 => {

    let colorScheme;
    let colorsArrayMap = new Map()
    let acceleration = 0;
    let velocity = 0
    let globalLineWidth = 30;

    let radius = 0.5;
    let colorFlipAllowed = false;

    const frate = 30 // frame rate
    const numFrames = 100 // num of frames to record
    let recording = false


    p5.setup = () => {
        const canv = p5.createCanvas(800, 800);
        canv.parent('sketch')
        p5.pixelDensity(pixelDens)
        p5.colorMode(p5.HSB)
        p5.sb = new PRNGRand(new Date().getMilliseconds())
        colorScheme = new ColorScheme(p5)


    }

    p5.keyPressed = () => {
        if (p5.key === 'r') {
            recording = !recording
            if (recording) {
                record()
            } else {
                exportVideo()
            }
        }
    }

    p5.draw = () => {
        p5.background(255)

        // const nsin = (n) => (p5.sin(n) + 1) * .5
        // const newCircle = (boid, colorsI, lineWidth) => {
        //     const d = new GrowingTexturedLine();
        //     d.rotation = 0;//getRotationFromFeature(p5, world)
        //     d.origin = p5.createVector(0,0)
        //     lineWidth = lineWidth || globalLineWidth;
        //     d.width = lineWidth;
        //     d.growthFactor = 1;
        //     d.points = [];
        //     // small inner to big outer
        //
        //     d.points = boid.points;// getCurvePoints(pointsNoCurve, 1.0, 5, true)
        //
        //     d.showIndent = false;// world.features.lineMode(lineModes.inlet)
        //     const frameTime = p5.frameCount / 100;
        //     // d.widthFunc = (f) => {
        //     //     return lineWidth + nsin(f * p5.TWO_PI + frameTime) * nsin(f * p5.TWO_PI * 1.3 + frameTime * 10.123) * nsin(f * p5.TWO_PI * 2 + frameTime * .8) * lineWidth * 3 + lineWidth * .5
        //     // }
        //
        //     let colorsArray = colorsArrayMap.get(colorsI) || []
        //     colorsArrayMap.set(colorsI, colorsArray)
        //     d.colorScheme = {
        //         colorsArray
        //     }
        //     if (colorsArray.length < d.points.length / 2) {
        //         let colIndex = 0;
        //         let randBypass = p5.sb.random()*.5;
        //         for (let i = 0; i < d.points.length / 2; i++) {
        //             if (p5.sb.random() < randBypass) {
        //                 colIndex++;
        //                 randBypass = p5.sb.random();
        //             }
        //             d.colorScheme.colorsArray.push(colorScheme.continuousStepped(colIndex))
        //         }
        //     }
        //
        //     new SteppedColorLineShape(d).render(p5)
        // }


        // for (let i = 0; i < flock.boids.length; i++) {
        //     newCircle(flock.boids[i], i)
        // }

        sol852(p5, colorScheme)
        p5.noLoop()
    }
    // var recorder=null;
    const record = () => {
        chunks.length = 0;
        let stream = document.querySelector('canvas').captureStream(30)
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            if (e.data.size) {
                chunks.push(e.data);
            }
        };
        recorder.start();

    }

    const exportVideo = (e) => {
        recorder.stop();

        setTimeout(() => {
            var blob = new Blob(chunks);
            var vid = document.createElement('video');
            vid.id = 'recorded'
            vid.controls = true;
            vid.src = URL.createObjectURL(blob);
            document.body.appendChild(vid);
            vid.play();
        }, 1000)
    }
}


new p5(sketch);
