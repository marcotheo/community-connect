import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

import Menu, {
  DropDownMenuItem,
  DropDownMenuLabel,
  DropDownSeparator,
} from "~/components/dropdownmenu/dropdownmenu";
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/card/card";
import Dialog, { DialogTrigger } from "~/components/dialog/dialog";
import Heading from "~/components/heading/heading";
import Button from "~/components/button/button";
import Input from "~/components/input/input";

export default component$(() => {
  return (
    <div>
      <br />
      <div class="flex flex-col gap-3">asdasd</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
