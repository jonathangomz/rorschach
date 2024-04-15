import { Localization, Determinant, Content, Frecuency } from './rorschach.types';

export class Answers {
  private numAnswers: number;

  public localization: Map<Localization, number>;
  public determinant: Map<Determinant, number>;
  public content: Map<Content, number>;
  public frecuency: Map<Frecuency, number>;

  private _W: number | undefined;
  private _D: number | undefined;
  private _Dd: number | undefined;
  private _F: number | undefined;
  private _FAmplio: number | undefined;
  private _FposAmplio: number | undefined;

  constructor(
    numAnswers: number,
    localization: Map<Localization, number>,
    determinant: Map<Determinant, number>,
    content: Map<Content, number>,
    frecuency: Map<Frecuency, number>
  ) {
    this.numAnswers = numAnswers;
    this.localization = localization;
    this.determinant = determinant;
    this.content = content;
    this.frecuency = frecuency;
  }

  /**
   * Check if all the sections have the same amount of answers
   * @returns `true` if have the same amount of answers, otherwise `false`
   */
  validate() {
    const localizationTotal = Array.from(this.localization.values()).reduce((prev, current) => prev + current, 0);
    const determinantTotal = Array.from(this.determinant.values()).reduce((prev, current) => prev + current, 0);
    const contentTotal = Array.from(this.content.values()).reduce((prev, current) => prev + current, 0);
    const frecuencyTotal = Array.from(this.frecuency.values()).reduce((prev, current) => prev + current, 0);

    return (localizationTotal === determinantTotal && determinantTotal === contentTotal && contentTotal === frecuencyTotal)
  }

  get W(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._W) {
      return this._W;
    }

    const variables = [Localization.W, Localization.WS, Localization.SW, Localization["W\\"], Localization["W\\S"], Localization["SW\\"]];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    this._W = answers.reduce((prev, current) => prev + current[1], 0);

    this._W = (this._W / this.numAnswers) * 100;

    return this._W;
  }

  get D(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._D) {
      return this._D;
    }

    const variables = [Localization.D, Localization.DS, Localization.SD];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    this._D = answers.reduce((prev, current) => prev + current[1], 0);

    this._D = (this._D / this.numAnswers) * 100;

    return this._D;
  }

  get Dd(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._Dd) {
      return this._Dd;
    }

    const variables = [Localization.Dd, Localization.De, Localization.Dr, Localization.Do, Localization['->DdS'], Localization.DdS, Localization.SDd, Localization.S, Localization.s];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    this._Dd = answers.reduce((prev, current) => prev + current[1], 0);

    this._Dd = (this._Dd / this.numAnswers) * 100;

    return this._Dd;
  }

  get F(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._F) {
      return this._F;
    }

    const variables = [Determinant['F+'], Determinant.F, Determinant['F-']];
    
    const answers = Array.from(this.determinant.entries()).filter(variable => variables.includes(variable[0]));

    this._F = answers.reduce((prev, current) => prev + current[1], 0);

    this._F = (this._F / this.numAnswers) * 100;

    return this._F;
  }

  get FAmplio(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._FAmplio) {
      return this._FAmplio;
    }

    const variables = [Determinant['F+'], Determinant.F, Determinant['F-'], Determinant['M+'], Determinant['M-'], Determinant['FM+'], Determinant['FM-'], Determinant['Ms+'], Determinant['Ms-'], Determinant['FC+'], Determinant['FC-'], Determinant['F/C+'], Determinant['F/C-'], Determinant['FCarb+'], Determinant['FCarb-'], Determinant['FC_+'], Determinant['FC_-'], Determinant['FCdet+'], Determinant['FCdet-'], Determinant['FCsim+'], Determinant['FCsim-'], Determinant['FCh+'], Determinant['FCh-'], Determinant['FC\'+'], Determinant['FC\'-'], Determinant['F(C)+'], Determinant['F(C)-']];
    
    const answers = Array.from(this.determinant.entries()).filter(variable => variables.includes(variable[0]));

    this._FAmplio = answers.reduce((prev, current) => prev + current[1], 0);

    this._FAmplio = (this._FAmplio / this.numAnswers) * 100;

    return this._FAmplio;
  }

  get FposSimple(): number {
    const Fpos = this.determinant.get(Determinant['F+']) ?? 0
    const F = this.determinant.get(Determinant.F) ?? 0
    const Fneg = this.determinant.get(Determinant['F-']) ?? 0

    const total = (Fpos + (F/2)) / (Fpos + F + Fneg);

    return total * 100;
  }

  get FposAmplio(): number {
    // If was already calculated. To avoid recalculations on each call.
    if(this._FposAmplio) {
      return this._FposAmplio;
    }

    const variablesFxpos = [Determinant['F+'], Determinant['M+'], Determinant['FM+'], Determinant['Ms+'], Determinant['FC+'], Determinant['F/C+'], Determinant['FCarb+'], Determinant['FC_+'], Determinant['FCdet+'], Determinant['FCsim+'], Determinant['FCh+'],  Determinant['FC\'+'], Determinant['F(C)+']];

    const variablesFx = [Determinant['F+'], Determinant.F, Determinant['F-'], Determinant['M+'], Determinant['M-'], Determinant['FM+'], Determinant['FM-'], Determinant['Ms+'], Determinant['Ms-'], Determinant['FC+'], Determinant['FC-'], Determinant['F/C+'], Determinant['F/C-'], Determinant['FCarb+'], Determinant['FCarb-'], Determinant['FC_+'], Determinant['FC_-'], Determinant['FCdet+'], Determinant['FCdet-'], Determinant['FCsim+'], Determinant['FCsim-'], Determinant['FCh+'], Determinant['FCh-'], Determinant['FC\'+'], Determinant['FC\'-'], Determinant['F(C)+'], Determinant['F(C)-']];
    
    const answersFxpos = Array.from(this.determinant.entries()).filter(variable => variablesFxpos.includes(variable[0]));
    const answersFx = Array.from(this.determinant.entries()).filter(variable => variablesFx.includes(variable[0]));

    let totalFxpos = answersFxpos.reduce((prev, current) => prev + current[1], 0);
    totalFxpos = ((this.determinant.get(Determinant.F) ?? 0) / 2) + totalFxpos

    const totalFx = answersFx.reduce((prev, current) => prev + current[1], 0);

    this._FposAmplio = (totalFxpos / totalFx) * 100;

    return this._FposAmplio;
  }

  get H(): number {
    const variables = [Content.H, Content.Hd, Content['(H)'], Content['(Hd)']];
    
    const answers = Array.from(this.content.entries()).filter(variable => variables.includes(variable[0]));

    const total = answers.reduce((prev, current) => prev + current[1], 0);

    return (total / this.numAnswers) * 100;
  }

  get A(): number {
    const variables = [Content.A, Content.Ad, Content['(A)'], Content['(Ad)']];
    
    const answers = Array.from(this.content.entries()).filter(variable => variables.includes(variable[0]));

    const total = answers.reduce((prev, current) => prev + current[1], 0);

    return (total / this.numAnswers) * 100;
  }

  get P(): number {
    const variables = [Frecuency.P, Frecuency['(P)']];
    
    const answers = Array.from(this.frecuency.entries()).filter(variable => variables.includes(variable[0]));

    const total = answers.reduce((prev, current) => prev + current[1], 0);

    return (total / this.numAnswers) * 100;
  }

  get O(): number {
    const variables = [Frecuency['O+'], Frecuency['O-'], Frecuency.O];
    
    const answers = Array.from(this.frecuency.entries()).filter(variable => variables.includes(variable[0]));

    const total = answers.reduce((prev, current) => prev + current[1], 0);

    return (total / this.numAnswers) * 100;
  }

  get App(): string {
    const W_MAX = 30;
    const W_MIN = 20;
    let W = 'W';
    if(this.W < W_MIN) {
      const diff = W_MIN - this.W;
      const symbolAmount = Math.floor(diff / 5);
      W = '('.repeat(symbolAmount) + W + ')'.repeat(symbolAmount);
    } else if(this.W > W_MAX) {
      const diff = this.W - W_MAX;
      const symbolAmount = Math.floor(diff / 5);
      W = '!'.repeat(symbolAmount) + W + '!'.repeat(symbolAmount);
    }

    const D_MAX = 70;
    const D_MIN = 60;
    let D = 'D';
    if(this.D < D_MIN) {
      const diff = D_MIN - this.D;
      const symbolAmount = Math.floor(diff / 5);
      D = '('.repeat(symbolAmount) + D  + ')'.repeat(symbolAmount);
    } else if(this.D > D_MAX) {
      const diff = this.D - D_MAX;
      const symbolAmount = Math.floor(diff / 5);
      D = '!'.repeat(symbolAmount) + D + '!'.repeat(symbolAmount);
    }

    const Dd_MAX = 12;
    const Dd_MIN = 0;
    let Dd  = 'Dd';
    if(this.Dd < Dd_MIN) {
      const diff = Dd_MIN - this.Dd;
      const symbolAmount = Math.floor(diff / 5);
      Dd = '('.repeat(symbolAmount) + Dd  + ')'.repeat(symbolAmount);
    } else if(this.Dd > Dd_MAX) {
      const diff = this.Dd - Dd_MAX;
      const symbolAmount = Math.floor(diff / 5);
      Dd = '!'.repeat(symbolAmount) + Dd + '!'.repeat(symbolAmount);
    }

    return `${W} ${D} ${Dd}`;
  }
}