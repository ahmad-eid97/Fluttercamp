"use client";
//= Styles
import cls from "./contactMap.module.scss";

function ContactMap() {
  return (
    <div className={cls.map}>
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
          <a href="https://123movies-to.org"></a>
        </div>
      </div>
    </div>
  );
}

export default ContactMap;
