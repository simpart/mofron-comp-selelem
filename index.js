/**
 * @file mofron-comp-selelem/index.js
 * @brief select element component for mofron
 * @license MIT
 */
const Frame   = require('mofron-comp-frame');
const HrzPos  = require('mofron-effect-hrzpos');
const Click   = require('mofron-event-click');
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends Frame {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("SelElem");
            
	    /* init config */
            this.confmng().add('selectEvent', { type: 'event', list: true });
            this.confmng().add('select', { type: 'boolean' });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initDomConts () {
        try {
            super.initDomConts();
	    let clk = (c1,c2,c3) => { c1.select(true); };
            this.event(new Click(clk));
	    this.effect(new HrzPos());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (fnc,prm) {
        try {
            return this.confmng(
                       'selectEvent',
                        (undefined !== fnc) ? [fnc,prm] : undefined
                   );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    select (prm) {
        try {
            let ret = this.confmng('select', prm);
            if (undefined !== prm) {
                let evt = this.selectEvent();
                for (let eidx in evt) {
                    evt[eidx][0](this, prm, evt[eidx][1]);
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
