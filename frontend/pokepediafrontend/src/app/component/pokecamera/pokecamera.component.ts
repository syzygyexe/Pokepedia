import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { WebcamComponent } from 'ngx-webcam';
import { Pokemon } from 'src/app/model/pokemon';
import { PokecameraService } from 'src/app/service/pokecamera.service';
import { PokemonTypesService } from 'src/app/service/pokemon-types.service';

@Component({
  selector: 'pokecamera',
  templateUrl: './pokecamera.component.html',
  styleUrls: ['./pokecamera.component.css'],
})
export class PokecameraComponent {
  @ViewChild('webcam') webcamRef!: WebcamComponent;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private pokecameraService: PokecameraService,
    private pokemonTypesService: PokemonTypesService
  ) {}

  // Initial unknown pokemon.
  // Changes with the help of Tensorflow JS model through webcamera.
  public pokemon: Pokemon = {
    name: 'Who Is This Pokemon?',
    type: 'Unknown type',
    imageUrl: 'assets/img/unknown_pokemon.png',
  };

  // Define labelmap
  labelMap: any = {
    1: { name: 'Pikachu', color: 'yellow' },
    2: { name: 'Blastoise', color: 'blue' },
    3: { name: 'Charizard', color: 'red' },
    4: { name: 'Eevee', color: 'white' },
  };

  ngAfterViewInit() {
    this.runTensorflow();
  }

  runTensorflow = async () => {
    // Load Tensorflow JS model.
    const net: any = await tf.loadGraphModel('indexeddb://pokemon-model');
    // Loop and detect pokemons.
    setInterval(() => {
      this.detect(net);
    }, 1000);
  };

  /**
   * HTTP GET request to fetch pokemons by provided name via Tensorflow JS model.
   * @param currentPokemon
   */
  public getPokemonByName(currentPokemon: string): void {
    this.pokecameraService.getPokemonByName(currentPokemon).subscribe(
      (response: Pokemon) => {
        this.pokemon = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Alter items background-color according to its type.
   * @param type pokemon type .
   * @returns string hex color code.
   */
  public setStyle(type: string): string {
    return this.pokemonTypesService.setStyles(type);
  }

  detect = async (net: any) => {
    const webcamWidth = this.webcamRef.width;
    const webcamHeight = this.webcamRef.height;
    const webcam = this.webcamRef.nativeVideoElement;

    this.canvasRef.nativeElement.width = webcamWidth;
    this.canvasRef.nativeElement.height = webcamHeight;

    const img = tf.browser.fromPixels(webcam);
    const resized = tf.image.resizeBilinear(img, [webcamWidth, webcamHeight]);
    const casted = resized.cast('int32');
    const expanded = casted.expandDims(0);
    const obj = await net.executeAsync(expanded);

    const boxes = await obj[7].array();
    const classes = await obj[1].array();
    const scores = await obj[3].array();

    // Draw mesh
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    // drawSomething(obj, ctx)
    requestAnimationFrame(() => {
      this.drawRect(
        boxes[0],
        classes[0],
        scores[0],
        0.9,
        webcamWidth,
        webcamHeight,
        ctx
      );
    });

    tf.dispose(img);
    tf.dispose(resized);
    tf.dispose(casted);
    tf.dispose(expanded);
    tf.dispose(obj);
  };

  // Define a drawing function
  drawRect = (
    boxes: number[][],
    classes: number[],
    scores: number[],
    threshold: number,
    imgWidth: number,
    imgHeight: number,
    ctx: CanvasRenderingContext2D
  ) => {
    for (let i = 0; i <= 1; i++) {
      if (boxes[i] && classes[i] && scores[i] > threshold) {
        // Extract variables
        const [y, x, height, width] = boxes[i];
        const text = classes[i];

        // Set styling
        ctx.strokeStyle = this.labelMap[text]['color'];
        ctx.lineWidth = 10;
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';

        // DRAW!!
        ctx.beginPath();
        ctx.fillText(
          this.labelMap[text]['name'] +
            ' - ' +
            Math.round(scores[i] * 100) +
            '%',
          x * imgWidth + 5,
          y * imgHeight + 30
        );
        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          (width * imgWidth) / 2.5,
          (height * imgHeight) / 2
        );
        ctx.stroke();
        // Request pokemon
        this.getPokemonByName(this.labelMap[text]['name']);
      }
    }
  };
}
