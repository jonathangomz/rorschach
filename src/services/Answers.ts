import { Localization, Determinant, Content, Frecuency } from './rorschach.types';

export class Answers {
  private numAnswers: number;

  public localization: Map<Localization, number>;
  public determinant: Map<Determinant, number>;
  public content: Map<Content, number>;
  public frecuency: Map<Frecuency, number>;

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

    return (this.numAnswers === localizationTotal && localizationTotal === determinantTotal && determinantTotal === contentTotal && contentTotal === frecuencyTotal)
  }

  validateNumSections() {
    const localizationTotal = Array.from(this.localization.values()).reduce((prev, current) => prev + current, 0);
    const determinantTotal = Array.from(this.determinant.values()).reduce((prev, current) => prev + current, 0);
    const contentTotal = Array.from(this.content.values()).reduce((prev, current) => prev + current, 0);
    const frecuencyTotal = Array.from(this.frecuency.values()).reduce((prev, current) => prev + current, 0);

    return (localizationTotal === determinantTotal && determinantTotal === contentTotal && contentTotal === frecuencyTotal)
  }

  validateNumAnswers() {
    const localizationTotal = Array.from(this.localization.values()).reduce((prev, current) => prev + current, 0);
    if(this.validateNumSections()) {
      return (this.numAnswers === localizationTotal);
    } else {
      return false;
    }
  }

  get W(): {result: number, formula: string} {
    const variables = [Localization.W, Localization.WS, Localization.SW, Localization["W\\"], Localization["W\\S"], Localization["SW\\"]];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = (total / this.numAnswers) * 100;

    return {
      result: this.round(total),
      formula: '((W+W +WS+SW+W. S+S W+Ws+sW+W. S+S W+DW+DdW) * 100) / R'
    };
  }

  get D(): {result: number, formula: string} {
    const variables = [Localization.D, Localization.DS, Localization.SD];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = (total / this.numAnswers) * 100;

    return {
      result: this.round(total),
      formula: '((D+DS+SD+Ds+sD) * 100) / R'
    };
  }

  get Dd(): {result: number, formula: string} {
    const variables = [Localization.Dd, Localization.De, Localization.Dr, Localization.Do, Localization['->DdS'], Localization.DdS, Localization.SDd, Localization.S, Localization.s];
    
    const answers = Array.from(this.localization.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = (total / this.numAnswers) * 100;

    return {
      result: this.round(total),
      formula: '((Dd+De+Dr+Do+S+s+DdS+SDd+Dds+sDd+DrS+Drs) * 100)/ R'
    };
  }

  get F(): {result: number, formula: string} {
    const variables = [Determinant['F+'], Determinant.F, Determinant['F-']];
    
    const answers = Array.from(this.determinant.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = (total / this.numAnswers) * 100;

    return {
      result: this.round(total),
      formula: '(((F+)+(F)+(F-)) * 100) / R'
    };
  }

  get FAmplio(): {result: number, formula: string} {
    const variables = [Determinant['F+'], Determinant.F, Determinant['F-'], Determinant['M+'], Determinant['M-'], Determinant['FM+'], Determinant['FM-'], Determinant['Ms+'], Determinant['Ms-'], Determinant['FC+'], Determinant['FC-'], Determinant['F/C+'], Determinant['F/C-'], Determinant['FCarb+'], Determinant['FCarb-'], Determinant['FC_+'], Determinant['FC_-'], Determinant['FCdet+'], Determinant['FCdet-'], Determinant['FCsim+'], Determinant['FCsim-'], Determinant['FCh+'], Determinant['FCh-'], Determinant['FC\'+'], Determinant['FC\'-'], Determinant['F(C)+'], Determinant['F(C)-']];
    
    const answers = Array.from(this.determinant.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = (total / this.numAnswers) * 100;

    return {
      result: this.round(total),
      formula: '(((F+) + (F-) + (F) + (FX+) + (FX-)) * 100) / R'
    };
  }

  get FposSimple(): {result: number, formula: string} {
    const Fpos = this.determinant.get(Determinant['F+']) ?? 0
    const F = this.determinant.get(Determinant.F) ?? 0
    const Fneg = this.determinant.get(Determinant['F-']) ?? 0

    let total = 0;
    if(Fpos && F && Fneg) {
      total = (Fpos + (F/2)) / (Fpos + F + Fneg);
      total = this.round(total * 100);
    }

    return {
      result: total,
      formula: '(((F+) + (F / 2)) * 100) / ((F+) + (F) + (F-))'
    }
  }

  get FposAmplio(): {result: number, formula: string} {
    const variablesFxpos = [Determinant['F+'], Determinant['M+'], Determinant['FM+'], Determinant['Ms+'], Determinant['FC+'], Determinant['F/C+'], Determinant['FCarb+'], Determinant['FC_+'], Determinant['FCdet+'], Determinant['FCsim+'], Determinant['FCh+'],  Determinant['FC\'+'], Determinant['F(C)+']];

    const variablesFx = [Determinant['F+'], Determinant.F, Determinant['F-'], Determinant['M+'], Determinant['M-'], Determinant['FM+'], Determinant['FM-'], Determinant['Ms+'], Determinant['Ms-'], Determinant['FC+'], Determinant['FC-'], Determinant['F/C+'], Determinant['F/C-'], Determinant['FCarb+'], Determinant['FCarb-'], Determinant['FC_+'], Determinant['FC_-'], Determinant['FCdet+'], Determinant['FCdet-'], Determinant['FCsim+'], Determinant['FCsim-'], Determinant['FCh+'], Determinant['FCh-'], Determinant['FC\'+'], Determinant['FC\'-'], Determinant['F(C)+'], Determinant['F(C)-']];
    
    const answersFxpos = Array.from(this.determinant.entries()).filter(variable => variablesFxpos.includes(variable[0]));
    const answersFx = Array.from(this.determinant.entries()).filter(variable => variablesFx.includes(variable[0]));

    let totalFxpos = answersFxpos.reduce((prev, current) => prev + current[1], 0);

    let total = 0;
    if(this.determinant.get(Determinant.F)) {
      totalFxpos = ((this.determinant.get(Determinant.F) ?? 0) / 2) + totalFxpos;

      const totalFx = answersFx.reduce((prev, current) => prev + current[1], 0);

      total = this.round((totalFxpos / totalFx) * 100);
    }

    return {
      result: total,
      formula: '(((F+)+(1/2F)+(FX+)) * 100) / ((F+) + (F) + (F-) + (FX+) + (FX-))'
    }
  }

  get H(): {result: number, formula: string} {
    const variables = [Content.H, Content.Hd, Content['(H)'], Content['(Hd)']];
    
    const answers = Array.from(this.content.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = this.round((total / this.numAnswers) * 100);
    
    return {
      result: total,
      formula: '([H + Hd + (H) + (Hd)] * 100) / R'
    }
  }

  get A(): {result: number, formula: string} {
    const variables = [Content.A, Content.Ad, Content['(A)'], Content['(Ad)']];
    
    const answers = Array.from(this.content.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = this.round((total / this.numAnswers) * 100);

    return {
      result: total,
      formula: '([A + Ad + (A) + (Ad)] * 100) / R'
    }
  }

  get P(): {result: number, formula: string} {
    const variables = [Frecuency.P, Frecuency['(P)']];
    
    const answers = Array.from(this.frecuency.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = this.round((total / this.numAnswers) * 100);

    return {
      result: total,
      formula: '([P + (P)] * 100) / R'
    }
  }

  get O(): {result: number, formula: string} {
    const variables = [Frecuency['O+'], Frecuency['O-'], Frecuency.O];
    
    const answers = Array.from(this.frecuency.entries()).filter(variable => variables.includes(variable[0]));

    let total = answers.reduce((prev, current) => prev + current[1], 0);

    total = this.round((total / this.numAnswers) * 100);

    return {
      result: total,
      formula: '(((O+) + (O-)) * 100) / R'
    }
  }

  get App(): { result: string, formula: string} {
    const W_MAX = 30;
    const W_MIN = 20;
    let W = 'W';
    if(this.W.result < W_MIN) {
      const diff = W_MIN - this.W.result;
      const symbolAmount = Math.round(diff / 10);
      W = '('.repeat(symbolAmount) + W + ')'.repeat(symbolAmount);
    } else if(this.W.result > W_MAX) {
      const diff = this.W.result - W_MAX;
      const symbolAmount = Math.round(diff / 10);
      W = W + '!'.repeat(symbolAmount);
    }

    const D_MAX = 70;
    const D_MIN = 60;
    let D = 'D';
    if(this.D.result < D_MIN) {
      const diff = D_MIN - this.D.result;
      const symbolAmount = Math.round(diff / 10);
      D = '('.repeat(symbolAmount) + D  + ')'.repeat(symbolAmount);
    } else if(this.D.result > D_MAX) {
      const diff = this.D.result - D_MAX;
      const symbolAmount = Math.round(diff / 10);
      D = D + '!'.repeat(symbolAmount);
    }

    const Dd_MAX = 12;
    const Dd_MIN = 0;
    let Dd  = 'Dd';
    if(this.Dd.result < Dd_MIN) {
      const diff = Dd_MIN - this.Dd.result;
      const symbolAmount = Math.round(diff / 10);
      Dd = '('.repeat(symbolAmount) + Dd  + ')'.repeat(symbolAmount);
    } else if(this.Dd.result > Dd_MAX) {
      const diff = this.Dd.result - Dd_MAX;
      const symbolAmount = Math.round(diff / 10);
      Dd = Dd + '!'.repeat(symbolAmount);
    }

    return {
      result: `${W} ${D} ${Dd}`,
      formula: 'W- D- Dd'
    }
  }

  get W_M(): { result: string, formula: string} {
    const varW = this.localization.get(Localization.W) ?? 0;
    const varMpos = this.determinant.get(Determinant['M+']) ?? 0;
    const varMneg = this.determinant.get(Determinant['M-']) ?? 0;
    const varM = varMpos + varMneg;

    let result = '';
    if(varW < 6 || varM < 3) {
      result = 'No aplica';
    } else if(varW > varM && varM > Math.floor(varW / 3)) {
      result = 'W:M'
    } else if(Math.floor(varW / 3) >= varM) {
      result = 'W>M'
    } else if(varW <= varM) {
      result = 'W<M'
    } else {
      result = 'ta raro';
    }

    const formula = 'W:M = 1:2; W>M = 1:3; W<M = 1:1';

    return { result, formula };
  }

  get M_ΣC(): {result: string, formula: string} {
    // Suma M
    const variablesM = [Determinant['M+'], Determinant['M-'], Determinant['FM+'], Determinant['FM-'], Determinant['Ms+'], Determinant['Ms-']];
    const answers = Array.from(this.determinant.entries()).filter(variable => variablesM.includes(variable[0]));
    const totalM = answers.reduce((prev, current) => prev + current[1], 0);
    const formulaM = `Σ(${variablesM.map((varM) => Determinant[varM]).join(', ')})`;

    // Suma C
    const varFC_pos_id = Determinant['FC+'];
    const varFC_neg_id = Determinant['FC-'];
    const varCF_id = Determinant.CF;
    const varC_id = Determinant.C;

    const varFC_pos = this.determinant.get(varFC_pos_id) ?? 0;
    const varFC_neg = this.determinant.get(varFC_neg_id) ?? 0;
    const varCF = this.determinant.get(varCF_id) ?? 0;
    const varC = this.determinant.get(varC_id) ?? 0;

    const totalC = ((varFC_pos + varFC_neg) * 0.5) + varCF + (varC * 1.5);
    const formulaC = `(FC * 0.5) + CF + (C * 1.5)`;

    return {
      result: `${totalM}:${totalC}`,
      formula: `M = ${formulaM}; C = ${formulaC}`
    }
  }

  get FC_CF_C(): {result: string, formula: string} {
    const varFC_pos_id = Determinant['FC+'];
    const varFC_neg_id = Determinant['FC-'];
    const varCF_id = Determinant.CF;
    const varC_id = Determinant.C;

    const varFC_pos = this.determinant.get(varFC_pos_id) ?? 0;
    const varFC_neg = this.determinant.get(varFC_neg_id) ?? 0;
    const varCF = this.determinant.get(varCF_id) ?? 0;
    const varC = this.determinant.get(varC_id) ?? 0;

    const left = ((varFC_pos + varFC_neg) * 0.5) > (varCF + (varC * 1.5));
    const leftFormula = `(FC * 0.5) > CF + (C * 1.5)`;
    
    const central = (varCF > (((varFC_pos + varFC_neg) * 0.5) + (varC * 1.5)));
    const centralFormula = `CF > ((FC * 0.5) + (C * 1.5))`;

    const right = ((varC * 1.5) > (((varFC_pos + varFC_neg) * 0.5) + varCF));
    const rightFormula = `(C * 1.5) > ((FC * 0.5) + CF)`;

    let result = '';
    if(left) {
      result = 'Izquierda';
    } else if(central) {
      result = 'Central';
    } else if (right) {
      result = 'Derecha';
    } else {
      result = 'No aplica';
    }

    return {
      result: `${result}`,
      formula: `${leftFormula}; ${centralFormula}; ${rightFormula}`
    }
  }

  get RelationH(): {result: string, formula: string} {
    const varH = this.content.get(Content.H) ?? 0;
    const varHd = this.content.get(Content.Hd) ?? 0;
    const varHpar = this.content.get(Content['(H)']) ?? 0;
    const varHdpar = this.content.get(Content['(Hd)']) ?? 0;

    const resultH_Hd = `${varH}:${varHd}`;
    const resultH_Hpar = `${varH}:${varHpar}`;
    const resultHHd_HHdpar = `${(varH + varHd)}:${(varHpar + varHdpar)}`;

    return {
      result: `${resultH_Hd};${resultH_Hpar};${resultHHd_HHdpar}`,
      formula: 'H:Hd; H:(H); (H+Hd):((H)+(Hd))'
    }
  }

  get RelationA(): {result: string, formula: string} {
    const varA = this.content.get(Content.A) ?? 0;
    const varAd = this.content.get(Content.Ad) ?? 0;
    const varApar = this.content.get(Content['(A)']) ?? 0;
    const varAdpar = this.content.get(Content['(Ad)']) ?? 0;

    const resultA_Ad = `${varA}:${varAd}`;
    const resultA_Apar = `${varA}:${varApar}`;
    const resultAAd_AAdpar = `${(varA + varAd)}:${(varApar + varAdpar)}`;

    return {
      result: `${resultA_Ad};${resultA_Apar};${resultAAd_AAdpar}`,
      formula: 'A:Ad; A:(A); (A+Ad):((A)+(Ad))'
    }
  }

  private round(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }
}