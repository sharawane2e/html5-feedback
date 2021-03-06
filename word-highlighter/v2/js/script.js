$(document).ready(function () {
  wedgitData();
  function wedgitData() {
    toolinfo_ = toolinfo.split("|");
    $(".containerBlock").before(
      ' <div class="title-toll">' +
        toolinfo_[0] +
        '</div><div class="respondent-info">' +
        toolinfo_[1] +
        "</div>"
    );
    $(".containerBlock").after(
      ' <div class="output-info"><b>Output</b>:' + toolinfo_[2] + "</div>"
    );

    $(".containerBlock").append(
      '<h2 id="h1Text"></h2>\
    <div id="spanText"></div>\
    <div id="image"></div>\
    <div id="listTxt"></div>'
    );

    function s(s, i) {
      (t[s.attr("data-info") - 1] = i), $("#res").val(t);
    }

    for (
      var i = url.split("|"),
        a = lisTxt.split("|"),
        l = h1.split(" "),
        t = [],
        n = spanText.split(" "),
        e = [],
        h = 0,
        o = 1,
        d = 0;
      d < a.length;
      d++
    )
      for (var r = a[d].split(" "), p = 0; p < r.length; p++) e.push(r[p]);
    h = l.length + n.length + e.length + i.length;
    for (var C = 0; C < h; C++) t[C] = "";
    for (var g = 0; g < l.length; g++)
      $("#h1Text").append(
        "<span class='noCk' data-info='" + o++ + "'>" + l[g] + "</span> "
      );
    for (var k = 0; k < n.length; k++)
      $("#spanText").append(
        "<span class='noCk' data-info='" + o++ + "'>" + n[k] + "</span> "
      );
    for (var m = 0; m < a.length; m++) {
      $("#listTxt").append("<li id='lival" + m + "'></li>");
      for (var v = a[m].split(" "), f = 0; f < v.length; f++)
        $("#lival" + m).append(
          "<span class='noCk' data-info='" + o++ + "'>" + v[f] + "</span> "
        );
    }
    for (var c = 0; c < i.length; c++)
      $("#image").append(
        "<div class='imgnoCk' data-info='" +
          o++ +
          "'><img src='" +
          i[c] +
          "'></div></img>"
      );
    $("span,img, .imgnoCk").click(function () {
      ///  $("#res").val($(this).attr("data-info")),
      // console.log($(this).attr("data-info"));
      $(this).hasClass("noCk")
        ? ($(this).removeClass("noCk"), $(this).addClass("like"), s($(this), 1))
        : $(this).hasClass("like")
        ? ($(this).removeClass("like"),
          $(this).addClass("Dislike"),
          s($(this), 2))
        : $(this).hasClass("Dislike")
        ? ($(this).removeClass("Dislike"),
          $(this).addClass("noCk"),
          s($(this), 0))
        : $(this).hasClass("imgnoCk")
        ? ($(this).removeClass("imgnoCk"),
          $(this).addClass("imglike"),
          s($(this), 1))
        : $(this).hasClass("imglike")
        ? ($(this).removeClass("imglike"),
          $(this).addClass("imgdislike"),
          s($(this), 2))
        : $(this).hasClass("imgdislike") &&
          ($(this).removeClass("imgdislike"),
          $(this).addClass("imgnoCk"),
          s($(this), 0));
    });
  }
});
