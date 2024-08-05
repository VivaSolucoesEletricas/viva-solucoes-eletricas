import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Link,
} from "@react-email/components";

export function Email({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-100">
        <Container className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Cabeçalho */}
          <Section className="bg-blue-600 p-6 text-center">
            <Img
              src="https://via.placeholder.com/150"
              alt="Logomarca da VIVA Soluções"
              className="mx-auto mb-4"
              style={{ maxWidth: "150px" }}
            />
          </Section>

          {/* Conteúdo */}
          <Section className="p-6">
            <Heading className="text-2xl font-bold text-blue-600 mb-4">
              Bem-vindo à VIVA Soluções!
            </Heading>
            <Text className="mb-4">Olá {name},</Text>
            <Text className="mb-4">
              Obrigado por se cadastrar para receber um orçamento de nossos
              serviços de energia solar. Estamos animados em tê-lo conosco e
              esperamos poder ajudá-lo a alcançar seus objetivos de
              sustentabilidade.
            </Text>
            <Text className="mb-4">
              Em breve, um de nossos consultores entrará em contato com você
              para discutir suas necessidades e fornecer mais informações sobre
              como podemos ajudá-lo a economizar energia e reduzir custos.
            </Text>
            <Text className="mb-4">
              Se você tiver alguma dúvida ou precisar de assistência imediata,
              não hesite em nos contatar.
            </Text>
            <Text>
              Atenciosamente,
              <br />
              Equipe VIVA Soluções
            </Text>
          </Section>

          {/* Rodapé */}
          <Section className="bg-blue-600 text-white text-center p-4">
            <Text>
              VIVA Soluções - Energia Solar
              <br />
              <Link
                href="mailto:contato@vivasolucoes.com.br"
                className="text-white underline"
              >
                contato@vivasolucoes.com.br
              </Link>
              <br />
              <Link
                href="https://www.vivasolucoes.com.br"
                className="text-white underline"
              >
                www.vivasolucoes.com.br
              </Link>
              <br />
              Siga-nos nas redes sociais:{" "}
              <Link href="#" className="text-white underline">
                Facebook
              </Link>{" "}
              |{" "}
              <Link href="#" className="text-white underline">
                Instagram
              </Link>{" "}
              |{" "}
              <Link href="#" className="text-white underline">
                LinkedIn
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
