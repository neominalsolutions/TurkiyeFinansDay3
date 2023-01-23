import React, { Component } from "react";

type Props = {
  title: string;
};

type State = {
  count: number;
  number: number;
};

// : kalıtımda extends kullanırız
export default class ClassComponentSample extends Component<Props, State> {
  // timer: any;

  constructor(props: Props) {
    super(props); // ts da kalıtım aldığında base componente super ile constructor geçeriz.

    // state inial değeri constructor vasıtası ile verdik.
    this.state = {
      count: 0,
      number: 0,
    };

    this.onChange = this.onChange.bind(this);
    // not class componentler içerisinde method kullanıyor ve bunu jsx dosyasında tetikliyorsak bu durumda bind keyword ile jsx bağlamamız gerekir.
  }

  // useEffect aşağıdaki 3 ana class based hook'a bakar.
  componentDidMount(): void {
    console.log("init");
    // component doma ilk basıldığıda bu hook çalışır
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    console.log("state-change", prevProps, prevState);
    // componentte bir state değişikliği olunca bu çalışır
    // yani prevState ile newState farklı ise jsx güncellenir.virtual dom çalışıyor

    // sadece number değişiminde bir işlem bir api call yapmam yada arayüzde bir değişiklik. number 10 ise kırmızı göster gibi

    if (prevState.count != this.state.count) {
      // ona göre işlem yap
    }

    // birden fazla kez bir değişimi takip edip api ye bağlanıcam if ile state değişimini hep kontrol ederek gitmem lazım.
  }

  componentWillUnmount(): void {
    console.log("destroy");
    // component domdan kaldırılacağında bu çalışır.
  }

  // class component çalıştığımızda function diye bir kavram yok bu sebeple arrow function olarak bunun yazımından ziyade aşağıdaki gibi class methodu olarak kullanırız.
  onChange(): void {
    this.setState({ count: 1 });
  }

  render() {
    return (
      <div>
        <p>FromProps: {this.props.title}</p>
        <button onClick={this.onChange}>Set State</button>
        <button
          onClick={() => {
            this.setState({ number: 1 });
          }}
        >
          Set Number
        </button>
        {/* <button onClick={() => {this.setState({ count: 1 })}}>Set State</button> */}
      </div>
    );
  }
}
