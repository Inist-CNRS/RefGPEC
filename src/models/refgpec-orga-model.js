/**
 * Dedicated model for the organizational chart list
 * in order to facilitate future updates
 */

var RefGpecOrgaModel = function (options) {
  const self = this;

  self.orga = {};
  this.initializing = true;
  this.ajaxLoading = false;
  this.onChanges = [];

  // simulate ajax request
  setTimeout(function () {
    // fake data for debug
    self.orga = {

      "inist": { orgaShortName: "INIST" },

      "sgal": { orgaShortName: "SGAL" },
      "sgal_stl": { orgaShortName: "SGAL/STL" },
      "sgal_srhu_sp": { orgaShortName: "SGAL/SRHU/SP" },
      "sgal_srhu": { orgaShortName: "SGAL/SRHU" },
      "sgal_sfj": { orgaShortName: "SGAL/SFJ" },

      "dsi": { orgaShortName: "DSI" },
      "dsi_siprod": { orgaShortName: "DSI/SIPROD" },
      "dsi_sidev": { orgaShortName: "DSI/SIDEV" },
      "dsi_sbur": { orgaShortName: "DSI/SBUR" },

      "dpi": { orgaShortName: "DPI" },
      "dpi_srde": { orgaShortName: "DPI/SRDE" },
      "dpi_spproj": { orgaShortName: "DPI/SPPROJ" },

      "dos": { orgaShortName: "DOS" },
      "dos_spub_eqvalobbd": { orgaShortName: "DOS/SPUB/EQVALOBBD" },
      "dos_spub_eqtrad": { orgaShortName: "DOS/SPUB/EQTRAD" },
      "dos_spub_eqsweb": { orgaShortName: "DOS/SPUB/EQSWEB" },
      "dos_spub_eqsenn": { orgaShortName: "DOS/SPUB/EQSENN" },
      "dos_spub": { orgaShortName: "DOS/SPUB" },
      "dos_sdoc_eqport": { orgaShortName: "DOS/SDOC/EQPORT" },
      "dos_sdoc_eqneg": { orgaShortName: "DOS/SDOC/EQNEG" },
      "dos_sdoc_eqfdd": { orgaShortName: "DOS/SDOC/EQFDD" },
      "dos_sdoc": { orgaShortName: "DOS/SDOC" },
      "dos_sav_sap": { orgaShortName: "DOS/SAV/SAP" },
      "dos_sav_eqvalodr": { orgaShortName: "DOS/SAV/EQVALODR" },
      "dos_sav_eqterm": { orgaShortName: "DOS/SAV/EQTERM" },
      "dos_sav": { orgaShortName: "DOS/SAV" },

      "ddo": { orgaShortName: "DDO" },
      "ddo_sf": { orgaShortName: "DDO/SF" },
      "ddo_scoo": { orgaShortName: "DDO/SCOO" },
      "ddo_scom": { orgaShortName: "DDO/SCOM" },

    };
    self.initializing = false;
    self.inform();
  }, Math.round(Math.random() * options.fakeLoadingMaxDelay));

};

RefGpecOrgaModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

RefGpecOrgaModel.prototype.inform = function () {
  this.onChanges.forEach(function (cb) { cb(); });
};

module.exports = RefGpecOrgaModel;