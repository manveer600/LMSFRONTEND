function CarouselSlide({image, title, description, slideNumber, totalSlides}){
    return(
        <div id={`slide${slideNumber}`} className="text-center text-red-500 font-bold carousel-item relative w-full">
          <div className="flex flex-col  w-full gap-8  items-center justify-center">
              <div className="absolute flex justify-between transform -translate-y-1/2 sm:px-28 left-5 right-5 top-1/2">
                <a href={`#slide${(slideNumber == 1 ? totalSlides : (slideNumber-1))}`} className="btn btn-circle">❮</a>
                <a href={`#slide${(slideNumber) % totalSlides + 1}`} className="btn btn-circle">❯</a>
              </div>
              <img src={image} className="w-40 m-auto rounded-full "/>
              <p className="text-xl text-gray-200 p-3 mt-20">{description}</p>
              <h3 className="text-4xl animate- font-semibold">-{title}</h3>
            </div>
          </div>
    )
}


export default CarouselSlide;