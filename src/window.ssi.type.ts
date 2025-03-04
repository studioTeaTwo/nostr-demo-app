/**
 * That's to empower individual on the self-sovereign way.<br/><br/>window.ssi is the most accessible API that is widely published on the web, which bridges the tasks related to credentials such like sign/decrypt between internal module and user land.
 */
export interface WindowSSI extends Omit<EventTarget, "dispatchEvent"> {
  /** @internal */
  _scope: "ssi";
  /** @internal */
  _proxy: EventTarget;
  /** @internal */
  _invoke: (event: CustomEvent) => void;

  nostr: WindowSSINostr;
}

/** Implementation list of Nostr signature spec. */
export type NostrSignType = "signEvent";
/** Implementation list of Nostr encyption spec. */
export type NostrEncryptType = "nip04" | "nip44";
/** Implementation list of Nostr encyption spec. */
export type NostrDecryptType = "nip04" | "nip44";

/**
 * The window.ssi subset for Nostr protocol.
 */
export interface WindowSSINostr extends Omit<EventTarget, "dispatchEvent"> {
  /** @internal */
  _proxy: EventTarget;
  /** @internal */
  _invoke: (action, data) => void;

  /** @ignore */
  generate(options?: object): Promise<string>;

  /**
   * Return public key set as primary currently. During the execution process, an internal authorization check is performed similar to `browser.ssi.askConsent`.
   *
   * @param options - Not implemented
   * @returns A Promise that will be fulfilled with a `string` of public key.
   * @throws If failed to get public key.
   */
  getPublicKey(options?: object): Promise<string>;
  /**
   * Callback type of `getPublicKey`.
   *
   * @param callback - A reference to a function that should be called in the near future, when the result is returned. The callback function is passed two arguments - 1. Error object if failed otherwise null, 2. The resulting public key.
   * @param options - Not implemented
   */
  getPublicKeyWithCallback(
    callback: (error: Error | null, publicKey: string) => unknown,
    options?: object
  ): void;

  /**
   * Pass message and return the signature by Nostr secret key. You should always read the public key without using cache just before sign/encrypt/decrypt, as the user may change their primary key without notifying you. During the execution process, an internal authorization check is performed similar to `browser.ssi.askConsent`.
   *
   * @param message - The message to sign. If it's not a string it must be stringified.
   * @param options - Direction about sign detail
   * @param options.type - The signature spec. e.g., 'signEvent'
   * @returns A Promise that will be fulfilled with a `string` of resulting signature.
   * @throws If failed to sign.
   */
  sign(
    message: string,
    options: {
      type: NostrSignType;
    }
  ): Promise<string>;
  /**
   * Callback type of `sign`.
   *
   * @param message - The message to sign. If it's not a string it must be stringified.
   * @param callback - A reference to a function that should be called in the near future, when the result is returned. The callback function is passed two arguments - 1. Error object if failed otherwise null, 2. The resulting signature.
   * @param options - Direction about sign detail
   * @param options.type - e.g., 'signEvent'
   */
  signWithCallback(
    message: string,
    callback: (error: Error | null, signature: string) => unknown,
    options: {
      type: NostrSignType;
    }
  ): void;

  /**
   * Pass plain text and return the cipher text by Nostr secret key. You should always read the public key without using cache just before sign/encrypt/decrypt, as the user may change their primary key without notifying you. During the execution process, an internal authorization check is performed similar to `browser.ssi.askConsent`.
   *
   * @param plaintext - The message to sign. If it's not a string it must be stringified.
   * @param options - Direction about sign detail
   * @param options.type - The encryption spec. e.g., 'nip04', 'nip44'
   * @param options.pubkey - The conversation partner's public key. If type is 'nip04' or 'nip44', then this is required.
   * @param options.version - The version to define encryption algorithms if the type is 'nip44'.
   * @returns A Promise that will be fulfilled with a `string` of resulting signature.
   * @throws If failed to encrypt.
   */
  encrypt(
    plaintext: string,
    options: {
      type: NostrEncryptType;
      pubkey?: string;
      version?: string;
    }
  ): Promise<string>;
  /**
   * Callback type of `encrypt`.
   *
   * @param plaintext - The message to sign. If it's not a string it must be stringified.
   * @param callback - A reference to a function that should be called in the near future, when the result is returned. The callback function is passed two arguments - 1. Error object if failed otherwise null, 2. The resulting ciphertext.
   * @param options - Direction about sign detail
   * @param options.type - The encryption spec. e.g., 'nip04', 'nip44'
   * @param options.pubkey - The conversation partner's public key. If type is 'nip04' or 'nip44', then this is required.
   * @param options.version - The version to define encryption algorithms if the type is 'nip44'.
   */
  encryptWithCallback(
    plaintext: string,
    callback: (error: Error | null, ciphertext: string) => unknown,
    options: {
      type: NostrEncryptType;
      pubkey?: string;
      version?: string;
    }
  ): void;

  /**
   * Pass cipher text and return the plain text by Nostr secret key. You should always read the public key without using cache just before sign/encrypt/decrypt, as the user may change their primary key without notifying you. During the execution process, an internal authorization check is performed similar to `browser.ssi.askConsent`.
   *
   * @param ciphertext - The cipher text to decrypt
   * @param options - Direction about sign detail
   * @param options.type - The encryption spec. e.g., 'nip04', 'nip44'
   * @param options.pubkey - The conversation partner's public key. If type is 'nip04' or 'nip44', then this is required.
   * @param options.version - The version to define encryption algorithms if the type is 'nip44'.
   * @returns A Promise that will be fulfilled with a `string` of resulting signature.
   * @throws If failed to decrypt.
   */
  decrypt(
    ciphertext: string,
    options: {
      type: NostrDecryptType;
      pubkey?: string;
      version?: string;
    }
  ): Promise<string>;
  /**
   * Callback type of `decrypt`.
   *
   * @param ciphertext - The cipher text to decrypt
   * @param callback - A reference to a function that should be called in the near future, when the result is returned. The callback function is passed two arguments - 1. Error object if failed otherwise null, 2. The resulting plaintext.
   * @param options - Direction about sign detail
   * @param options.type - The encryption spec. e.g., 'nip04', 'nip44'
   * @param options.pubkey - The conversation partner's public key. If type is 'nip04' or 'nip44', then this is required.
   * @param options.version - The version to define encryption algorithms if the type is 'nip44'.
   */
  decryptWithCallback(
    ciphertext: string,
    callback: (error: Error | null, plaintext: string) => unknown,
    options: {
      type: NostrDecryptType;
      pubkey?: string;
      version?: string;
    }
  ): void;

  /** @ignore */
  messageBoard?: unknown;
}
